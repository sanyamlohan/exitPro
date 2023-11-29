import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import TYPES from '@ioc/constant/Types';
import { BaseController } from '@shared-infra/http/controller/BaseController';
import { AppError } from '@core/error/AppError';
import { SecurityService } from '../../application/service/SecurityService';
import { LoginDTO } from '../../application/dtos/LoginDto';

@injectable()
export class LoginController extends BaseController {
  constructor(
    @inject(TYPES.SecurityService)
    private securityService: SecurityService
  ) {
    super();
  }
  public async executeImpl(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const dto: LoginDTO = { ...request.body };

    try {
      let result = await this.securityService.loginSecurity(dto);
      if (result.isLeft()) {
        const error: any = result.value;
        switch (error.constructor) {
          case AppError.DatabaseError:
            return BaseController.jsonResponse(
              response,
              502,
              'database error while login into the system'
            );
          default:
            return this.fail(response, error, next);
        }
      } else {
        if (result.value.data == undefined) {
          result = {
            isSuccess: false
          };
        } else {
          result = {
            isSuccess: true
          };
        }

        return this.ok<any>(response, result);
      }
    } catch (err) {
      return this.fail(response, new AppError.UnexpectedError(err), next);
    }
  }
}
