import { IBaseRepository } from '../../../../shared/infra/persistence/mongo/IBaseRepository';
import { IStudentModel } from '../../../../shared/infra/persistence/mongo/models/StudentModel';
// Here we are be passing the ORM model entity instead of Entitybeacuse of base repo pattern
export interface IStudentRepository extends IBaseRepository<IStudentModel> {
  // If any other implementation are happening here we can pass the direct domain entity class
}
