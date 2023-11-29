import { injectable } from 'inversify';
import studentSchema, {
  IStudentModel
} from '@shared-infra/persistence/mongo/models/StudentModel';
import { BaseRepository } from '@shared-infra/persistence/mongo/BaseRepository';
import { IStudentRepository } from '../../domain/repository/IStudentRepository';

@injectable()
export class StudentRepository
  extends BaseRepository<IStudentModel>
  implements IStudentRepository
{
  constructor() {
    super('student', studentSchema);
  }
}
