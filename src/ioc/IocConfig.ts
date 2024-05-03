import { Container } from 'inversify';
import '../module/exitPro/application/service/ScheduleAPI';

import '../module/exitPro/infrastructure/routers/StudentRouter';
import '../module/exitPro/infrastructure/routers/SecurityRouter';

import { StudentService } from '../module/exitPro/application/service/StudentService';
import { SecurityService } from '../module/exitPro/application/service/SecurityService';
import { IStudentRepository } from '../module/exitPro/domain/repository/IStudentRepository';
import { IEntryExitRepository } from '../module/exitPro/domain/repository/IEntryExitRepository';
import { ISecurityRepository } from '../module/exitPro/domain/repository/ISecurityRepository';
import { StudentRepository } from '../module/exitPro/infrastructure/repository-implementation/StudentRepository';
import { EntryExitRepository } from '../module/exitPro/infrastructure/repository-implementation/EntryExitRepository';
import { SecurityRepository } from '../module/exitPro/infrastructure/repository-implementation/SecurityRepository';
import { CreateStudentController } from '../module/exitPro/infrastructure/controller/CreateStudentController';
import { CreateExitController } from '../module/exitPro/infrastructure/controller/CreateExitController';
import { CreateEntryController } from '../module/exitPro/infrastructure/controller/CreateEntryController';
import { GetStudentController } from '../module/exitPro/infrastructure/controller/GetStudentController';
import { GetLateStudentsController } from '../module/exitPro/infrastructure/controller/GetLateStudentsController';
import { LoginController } from '../module/exitPro/infrastructure/controller/LoginController';
import { CreateSecurityController } from '../module/exitPro/infrastructure/controller/CreateSecurityController';
import { SendWarningStudentsController } from '../module/exitPro/infrastructure/controller/SendWarningStudentsController';

import TYPES from './constant/Types';
import { errorHandler } from '@core/error/ErrorHandler';
import { GetOtpMatchResultController } from '../module/exitPro/infrastructure/controller/GetOtpMatchResultController';

const InversifyConfigContainer = async () => {
  const container = new Container();

  try {
    container.bind<StudentService>(TYPES.StudentService).to(StudentService);
    container.bind<SecurityService>(TYPES.SecurityService).to(SecurityService);
    container
      .bind<IStudentRepository>(TYPES.IStudentRepository)
      .to(StudentRepository);
    container
      .bind<IEntryExitRepository>(TYPES.IEntryExitRepository)
      .to(EntryExitRepository);
    container
      .bind<ISecurityRepository>(TYPES.ISecurityRepository)
      .to(SecurityRepository);

    container
      .bind<CreateStudentController>(TYPES.CreateStudentController)
      .to(CreateStudentController)
      .inSingletonScope();
    container
      .bind<CreateSecurityController>(TYPES.CreateSecurityController)
      .to(CreateSecurityController)
      .inSingletonScope();
    container
      .bind<CreateExitController>(TYPES.CreateExitController)
      .to(CreateExitController)
      .inSingletonScope();
    container
      .bind<CreateEntryController>(TYPES.CreateEntryController)
      .to(CreateEntryController)
      .inSingletonScope();
    container
      .bind<GetStudentController>(TYPES.GetStudentController)
      .to(GetStudentController)
      .inSingletonScope();
    container
      .bind<GetLateStudentsController>(TYPES.GetLateStudentsController)
      .to(GetLateStudentsController)
      .inSingletonScope();
    container
      .bind<GetOtpMatchResultController>(TYPES.GetOtpMatchResultController)
      .to(GetOtpMatchResultController)
      .inSingletonScope();
    container
      .bind<SendWarningStudentsController>(TYPES.SendWarningStudentsController)
      .to(SendWarningStudentsController)
      .inSingletonScope();
    container
      .bind<LoginController>(TYPES.LoginController)
      .to(LoginController)
      .inSingletonScope();
  } catch (err: unknown) {
    errorHandler.handleError(err as Error);
  }

  return container;
};

export { InversifyConfigContainer };
