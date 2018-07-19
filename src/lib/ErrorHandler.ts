import { inject, injectable } from "inversify";

import { ValidationErrorHandler } from "./ValidationErrorHandler";
/**
 *
 *
 * @export
 * @class ErrorHandler
 */
@injectable()
export class ErrorHandler {
  /**
   *Creates an instance of ErrorHandler.
   * @param {ValidationErrorHandler} validationErrorHandler
   * @memberof ErrorHandler
   */
  constructor(@inject("ValidationErrorHandler") private validationErrorHandler: ValidationErrorHandler) { }
  public handle(err: Error) {
    if (err.name === "ValidationError") {
      return this.validationErrorHandler.handle(err);
    }
    return err;
  }
}