import { IBaseRepository } from '../../../../shared/infra/persistence/mongo/IBaseRepository';
import { ISecurityModel } from '../../../../shared/infra/persistence/mongo/models/SecurityModel';
// Here we are be passing the ORM model entity instead of Entitybeacuse of base repo pattern
export interface ISecurityRepository extends IBaseRepository<ISecurityModel> {
  // If any other implementation are happening here we can pass the direct domain entity class
}