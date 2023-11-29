import { injectable } from 'inversify';
import securitySchema, {
  ISecurityModel
} from '@shared-infra/persistence/mongo/models/SecurityModel';
import { BaseRepository } from '@shared-infra/persistence/mongo/BaseRepository';
import { ISecurityRepository } from '../../domain/repository/ISecurityRepository';

@injectable()
export class SecurityRepository
  extends BaseRepository<ISecurityModel>
  implements ISecurityRepository
{
  constructor() {
    super('security', securitySchema);
  }
}
