import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import TYPES from '@ioc/constant/Types';
import { BaseController } from '@shared-infra/http/controller/BaseController';
import { AppError } from '@core/error/AppError';
import { StudentService } from '../../application/service/StudentService';
import { SecurityErrors } from '../../application/errors/SecurityError';

@injectable()
export class CreateEntryController extends BaseController {
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
    const roll_number = Number(request.params.roll_number);

    try {
      let result = await this.studentService.createEntry(roll_number);

      if (result.isLeft()) {
        const error: any = result.value;
        switch (error.constructor) {
          case AppError.DatabaseError:
            return BaseController.jsonResponse(
              response,
              502,
              'database error while creating entry'
            );
          case SecurityErrors.AlreadyInsideError:
            result = { isSuccess: false };
            return this.ok<any>(response, result);
          default:
            return this.fail(response, error, next);
        }
      } else {
        result = { isSuccess: true };
        return this.ok<any>(response, result);
      }
    } catch (err) {
      return this.fail(response, new AppError.UnexpectedError(err), next);
    }
  }
}
