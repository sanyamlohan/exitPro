import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import TYPES from '@ioc/constant/Types';
import { BaseController } from '@shared-infra/http/controller/BaseController';
import { AppError } from '@core/error/AppError';
import { StudentDTO } from '../../application/dtos/StudentDto';
import { StudentService } from '../../application/service/StudentService';

@injectable()
export class CreateStudentController extends BaseController {
  constructor(
    @inject(TYPES.StudentService)
    private studentService: StudentService
  ) {
    super();
  }
  public async executeImpl(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const dto: StudentDTO = { ...request.body };

    try {
      const result = await this.studentService.createStudent(dto);

      if (result.isLeft()) {
        const error: any = result.value;
        switch (error.constructor) {
          case AppError.DatabaseError:
            return BaseController.jsonResponse(
              response,
              502,
              'database error while creating new student'
            );
          default:
            return this.fail(response, error, next);
        }
      } else {
        return this.ok<any>(response, result);
      }
    } catch (err) {
      return this.fail(response, new AppError.UnexpectedError(err), next);
    }
  }
}
