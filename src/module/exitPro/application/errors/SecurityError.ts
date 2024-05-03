import { BaseError } from '@core/error/BaseError';

export namespace SecurityErrors {
  export class AlreadyOutsideError extends BaseError {
    constructor(err: Error) {
      super(err as Error, `Already Outside`, true);
    }
  }

  export class AlreadyInsideError extends BaseError {
    constructor(err: Error) {
      super(err as Error, `Already Inside`, true);
    }
  }

  export class UnAuthorizeUser extends BaseError {
    constructor(err: Error) {
      super(err as Error, 'Otp did not match', true);
    }
  }
}
