import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPost,
  httpPut
} from 'inversify-express-utils';
import {
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationPut,
  ApiPath
} from 'swagger-express-ts';
import TYPES from '@ioc/constant/Types';
import DtoRouteValidationMiddleware from '@shared-infra/http/middleware/DtoRouteValidationMiddleware';
import { StudentDTO } from '../../application/dtos/StudentDto';
import { CreateStudentController } from '../controller/CreateStudentController';
import { CreateExitController } from '../controller/CreateExitController';
import { GetStudentController } from '../controller/GetStudentController';
import { InputDTO } from '../../application/dtos/ExitDto';
import { CreateEntryController } from '../controller/CreateEntryController';
import { GetLateStudentsController } from '../controller/GetLateStudentsController';

@ApiPath({
  name: 'student',
  path: '/student'
})
@controller('/student')
export abstract class studentRouters {
  constructor(
    @inject(TYPES.CreateStudentController)
    private readonly _createStudentController: CreateStudentController,
    @inject(TYPES.CreateExitController)
    private readonly _createExitController: CreateExitController,
    @inject(TYPES.CreateEntryController)
    private readonly _createEntryController: CreateEntryController,
    @inject(TYPES.GetStudentController)
    private readonly _getStudentController: GetStudentController,
    @inject(TYPES.GetLateStudentsController)
    private readonly _getLateStudentsController: GetLateStudentsController
  ) {}

  @ApiOperationPost({
    description: 'enter details of students',
    summary: 'enter details of new students ',
    parameters: {
      body: { description: 'enter the data', required: true, model: 'Student' }
    },
    responses: {
      200: { description: 'Success' },
      400: { description: 'Something fails' }
    }
  })
  @httpPost('/', DtoRouteValidationMiddleware(StudentDTO))
  public async createStudent(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return this._createStudentController.execute(request, response, next);
  }

  @ApiOperationPost({
    description: 'enter details',
    summary: 'enter details ',
    parameters: {
      body: {
        description: 'enter the data',
        required: true,
        model: 'EntryExit'
      }
    },
    responses: {
      200: { description: 'Success' },
      400: { description: 'Something fails' }
    }
  })
  @httpPost('/exit', DtoRouteValidationMiddleware(InputDTO))
  public async createExit(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return this._createExitController.execute(request, response, next);
  }

  @ApiOperationPut({
    description: 'enter details',
    summary: 'enter details ',
    parameters: {
      body: {
        description: 'enter the data',
        required: true,
        model: 'EntryExit'
      }
    },
    responses: {
      200: { description: 'Success' },
      400: { description: 'Something fails' }
    }
  })
  @httpPut('/entry/:roll_number')
  public async createEntry(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return this._createEntryController.execute(request, response, next);
  }

  @ApiOperationGet({
    description: 'enter details',
    summary: 'enter details ',
    responses: {
      200: { description: 'Success' },
      400: { description: 'Something fails' }
    }
  })
  @httpGet('/late')
  public async getLateStudents(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return this._getLateStudentsController.execute(request, response, next);
  }

  @ApiOperationGet({
    description: 'enter details',
    summary: 'enter details ',
    responses: {
      200: { description: 'Success' },
      400: { description: 'Something fails' }
    }
  })
  @httpGet('/:id')
  public async getStudent(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return this._getStudentController.execute(request, response, next);
  }
}
