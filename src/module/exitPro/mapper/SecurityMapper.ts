import { ISecurityModel } from '@shared-infra/persistence/mongo/models/SecurityModel';
import { SecurityDTO } from '../application/dtos/SecurityDto';
import { Security } from '../domain/entity/Security';

export class SecurityMap {
  public static fromDTOToDomain(security: SecurityDTO): Security {
    return Security.create({
      guardId: security.guardId,
      guardName: security.guardName,
      guardContact: security.guardContact
    });
  }

  public static fromDomainToPersistence(security: Security): ISecurityModel {
    return {
        guardId: security.getGuardId,
        guardName: security.getGuardName,
        guardContact: security.getGuardContact
    };
  }
}