import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { ApiOperationGet, ApiOperationPost, ApiPath } from 'swagger-express-ts';
import TYPES from '@ioc/constant/Types';
import DtoRouteValidationMiddleware from '@shared-infra/http/middleware/DtoRouteValidationMiddleware';
import { LoginDTO } from '../../application/dtos/LoginDto';
import { LoginController } from '../controller/LoginController';
import { SecurityDTO } from '../../application/dtos/SecurityDto';
import { CreateSecurityController } from '../controller/CreateSecurityController';
import { GetOtpMatchResultController } from '../controller/GetOtpMatchResultController';

@ApiPath({
  name: 'security',
  path: '/security'
})
@controller('/security')
export abstract class securityRouters {
  constructor(
    @inject(TYPES.LoginController)
    private readonly _loginController: LoginController,
    @inject(TYPES.CreateSecurityController)
    private readonly _createSecurityController: CreateSecurityController,
    @inject(TYPES.GetOtpMatchResultController)
    private readonly _getOtpMatchResultController: GetOtpMatchResultController
  ) {}

  @ApiOperationPost({
    description: 'enter details of guard to login in the system',
    summary: 'enter details of guard ',
    parameters: {
      body: { description: 'enter the data', required: true, model: 'Security' }
    },
    responses: {
      200: { description: 'Success' },
      400: { description: 'Something fails' }
    }
  })
  @httpPost('/', DtoRouteValidationMiddleware(SecurityDTO))
  public async createSecurity(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return this._createSecurityController.execute(request, response, next);
  }

  @ApiOperationPost({
    description: 'enter details of guard to login in the system',
    summary: 'enter details of guard ',
    parameters: {
      body: { description: 'enter the data', required: true, model: 'Security' }
    },
    responses: {
      200: { description: 'Success' },
      400: { description: 'Something fails' }
    }
  })
  @httpPost('/login', DtoRouteValidationMiddleware(LoginDTO))
  public async login(request: Request, response: Response, next: NextFunction) {
    return this._loginController.execute(request, response, next);
  }

  @ApiOperationGet({
    description: 'enter details',
    summary: 'enter details ',
    responses: {
      200: { description: 'Success' },
      400: { description: 'Something fails' }
    }
  })
  @httpPost('/otpMatch')
  public async getLateStudents(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return this._getOtpMatchResultController.execute(request, response, next);
  }
}
