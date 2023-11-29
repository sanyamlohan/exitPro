import { inject, injectable } from 'inversify';
import TYPES from '@ioc/constant/Types';
import { AppError } from '@core/error/AppError';
import { left, Result, right } from '@core/result/Result';
import { LoginDTO } from '../dtos/LoginDto';
import { ISecurityRepository } from '../../domain/repository/ISecurityRepository';
import { SecurityDTO } from '../dtos/SecurityDto';
import { SecurityMap } from '../../mapper/SecurityMapper';

@injectable()
export class SecurityService {
  constructor(
    @inject(TYPES.ISecurityRepository)
    private readonly _securityRepository: ISecurityRepository
  ) {}

  public async createSecurity(securityDto: SecurityDTO): Promise<any> {
    const securityEntity = SecurityMap.fromDTOToDomain(securityDto); // Checking with domain is happening in the mapper directly
    /* This part can't work if we have base implementation in repo pattern else this map can be done in the repository */
    const securityModelEntity = SecurityMap.fromDomainToPersistence(securityEntity);
    const result = await this._securityRepository.create(securityModelEntity);

    if(result.isLeft()){
      return left(
        new AppError.DatabaseError(result.value.error.value)
      );
    }
    return right(Result.ok<any>(result.value));
  }

  public async loginSecurity(dto: LoginDTO): Promise<any> {
    let guardId = dto.guardId
    if(guardId.charAt(0) == 'g'){
      guardId = "G" + guardId.slice(1);
    }

    const result = await this._securityRepository.getSecurityGuard(guardId);
    if(result.isLeft()){
      return left(
        new AppError.DatabaseError(result.value.error.value)
      );
    }
    return right(Result.ok<any>(result.value[0]));
  }
}