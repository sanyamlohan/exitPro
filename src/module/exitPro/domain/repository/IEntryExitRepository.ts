import { IBaseRepository } from '../../../../shared/infra/persistence/mongo/IBaseRepository';
import { IEntryExitModel } from '../../../../shared/infra/persistence/mongo/models/EntryExitModel';
// Here we are be passing the ORM model entity instead of Entitybeacuse of base repo pattern
export interface IEntryExitRepository extends IBaseRepository<IEntryExitModel> {
  // If any other implementation are happening here we can pass the direct domain entity class
}
