import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import TYPES from '@ioc/constant/Types';
import { BaseController } from '@shared-infra/http/controller/BaseController';
import { AppError } from '@core/error/AppError';
import { StudentService } from '../../application/service/StudentService';

@injectable()
export class GetLateStudentsController extends BaseController {
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
    const id: Number = Number(request.params.id);

    try {
      const result = await this.studentService.getLateStudents();
      
      if (result.isLeft()) {
        const error: any = result.value;
        switch (error.constructor) {
          case AppError.DatabaseError:
            return BaseController.jsonResponse(response, 502, "database error while finding the student");
          default:
            return this.fail(response, error, next);
        }
      } else {
        const ans: any = result.value.data;
        return this.ok<any>(response, ans);
      }
    } catch (err) {
      return this.fail(response, new AppError.UnexpectedError(err), next);
    }
  }
}