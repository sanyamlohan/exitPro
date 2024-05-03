import { inject, injectable } from 'inversify';
import TYPES from '@ioc/constant/Types';
import { AppError } from '@core/error/AppError';
import { left, Result, right } from '@core/result/Result';
import { LoginDTO } from '../dtos/LoginDto';
import { ISecurityRepository } from '../../domain/repository/ISecurityRepository';
import { SecurityDTO } from '../dtos/SecurityDto';
import { SecurityMap } from '../../mapper/SecurityMapper';
import { sendSMS } from '../../utils/msgUtils';
import { SecurityErrors } from '../errors/SecurityError';

@injectable()
export class SecurityService {
  constructor(
    @inject(TYPES.ISecurityRepository)
    private readonly _securityRepository: ISecurityRepository
  ) {}

  public async createSecurity(securityDto: SecurityDTO): Promise<any> {
    const securityEntity = SecurityMap.fromDTOToDomain(securityDto); // Checking with domain is happening in the mapper directly
    /* This part can't work if we have base implementation in repo pattern else this map can be done in the repository */
    const securityModelEntity =
      SecurityMap.fromDomainToPersistence(securityEntity);
    const result = await this._securityRepository.create(securityModelEntity);

    if (result.isLeft()) {
      return left(new AppError.DatabaseError(result.value.error.value));
    }
    return right(Result.ok<any>(result.value));
  }

  public async loginSecurity(dto: LoginDTO): Promise<any> {
    let guardId = dto.guardId;
    if (guardId.charAt(0) == 'g') {
      guardId = 'G' + guardId.slice(1);
    }

    let result = await this._securityRepository.getSecurityGuard(guardId);
    if (result.isLeft()) {
      return left(new AppError.DatabaseError(result.value.error.value));
    }

    const contact = result.value[0].guardContact;
    let otp = await sendSMS(contact);

    otp = otp.value;

    result = await this._securityRepository.updateSecurity(contact, otp);

    return right(Result.ok<any>(result.value));
  }

  public async getOtpMatchResult(dto: any): Promise<any> {
    const otp = dto.otp;
    const id = dto.guardId;

    const result = await this._securityRepository.getSecurityGuard(id);

    if (otp === result.value[0].otp) {
      return right(Result.ok<any>(result.value));
    }

    return left(
      new SecurityErrors.UnAuthorizeUser(new Error('unauthorized person'))
    );
  }
}
