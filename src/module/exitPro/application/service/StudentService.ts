import { inject, injectable } from 'inversify';
import TYPES from '@ioc/constant/Types';
import { AppError } from '@core/error/AppError';
import { Either, left, Result, right } from '@core/result/Result';
import { StudentDTO } from '../dtos/StudentDto';
import { EntryExitDTO } from '../dtos/EntryExitDto';
import { IStudentRepository } from '../../domain/repository/IStudentRepository';
import { StudentMap } from '../../mapper/StudentMapper';
import { EntryExitMap } from '../../mapper/EntryExitMapper';
import { IEntryExitRepository } from '../../domain/repository/IEntryExitRepository';
import { InputDTO } from '../dtos/ExitDto';
import { SecurityErrors } from '../errors/SecurityError';

type studentResponse = Either<AppError.UnexpectedError, Result<StudentDTO>>;

@injectable()
export class StudentService {
  constructor(
    @inject(TYPES.IStudentRepository)
    private readonly _studentRepository: IStudentRepository,
    @inject(TYPES.IEntryExitRepository)
    private readonly _entryExitRepository: IEntryExitRepository
  ) {}

  public async createStudent(studentDto: StudentDTO): Promise<studentResponse> {
    const studentEntity = StudentMap.fromDTOToDomain(studentDto); // Checking with domain is happening in the mapper directly
    /* This part can't work if we have base implementation in repo pattern else this map can be done in the repository */
    const studentModelEntity = StudentMap.fromDomainToPersistence(studentEntity);
    const result = await this._studentRepository.create(studentModelEntity);

    if(result.isLeft()){
      return left(
        new AppError.DatabaseError(result.value.error.value)
      );
    }
    return right(Result.ok<StudentDTO>(result.value));
  }

  public async getStudent(roll_number: Number): Promise<any> {
    const result = await this._studentRepository.get(roll_number);

    if(result.isLeft()){
      return left(
        new AppError.DatabaseError(result.value.error.value)
      );
    }

    const ans = StudentMap.fromPersistenceToDTO(result.value[0]);
    return right(Result.ok<any>(ans));
  }

  public async getLateStudents(): Promise<any> {
    const result = await this._entryExitRepository.getLateStudents();

    if(result.isLeft()){
      return left(
        new AppError.DatabaseError(result.value.error.value)
      );
    }

    interface MyObject {
      name: string;
      contact: string;
      roll_number: string;
      goingTo: string;
      outTime: string;
    }

    const ans: MyObject[] = [];
    for(let i=0; i<result.value.length; i++){
      const temp = StudentMap.fromPersistenceToDTO(result.value[i]);
      temp.outTime = temp.outTime.slice(4, 24);
      ans.push(temp);
    }

    return right(Result.ok<any>(ans));
  }

  public async createExit(inputDto: InputDTO): Promise<any> {
    const student = await this._studentRepository.get(inputDto.roll_number);

    const alreadyOutside = await this._entryExitRepository.getEntry(inputDto.roll_number);
    if(alreadyOutside.value[0] !== undefined){
      return left(
        new SecurityErrors.AlreadyOutsideError(new Error("already outside"))
      );
    }

    const exitEntity = EntryExitMap.fromDTOToDomain(student.value[0], inputDto); // Checking with domain is happening in the mapper directly
    /* This part can't work if we have base implementation in repo pattern else this map can be done in the repository */
    const exitModelEntity = EntryExitMap.fromDomainToPersistence(exitEntity);
    const result = await this._entryExitRepository.create(exitModelEntity);

    if(result.isLeft()){
      return left(
        new AppError.DatabaseError(result.value.error.value)
      );
    }
    return right(Result.ok<EntryExitDTO>(result.value));
  }

  public async createEntry(roll_number: Number): Promise<any> {
    const alreadyInside = await this._entryExitRepository.getEntry(roll_number);
    if(alreadyInside.value[0] === undefined){
      return left(
        new SecurityErrors.AlreadyInsideError(new Error("already inside"))
      );
    }

    const result = await this._entryExitRepository.updateStudent(roll_number, String(new Date()));
    if(result.isLeft()){
      return left(
        new AppError.DatabaseError(result.value.error.value)
      );
    }
    return right(Result.ok<EntryExitDTO>(result));
  }
}
