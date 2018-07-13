import { injectable } from "inversify";
import { validationResult } from "express-validator/check";
import { Request, Response } from "express";

/**
 *
 *
 * @export
 * @class ValidationErrorHandler
 */
@injectable()
export class ValidationErrorHandler {
  /**
   *
   *
   * @param {Error} err
   * @returns
   * @memberof ValidationErrorHandler
   */
  public handle(err: Error) {
    return err;
  }

  /**
   *
   *
   * @static
   * @param {Request} req
   * @returns {boolean}
   * @memberof ValidationErrorHandler
   */
  public static hasError(req: Request): boolean {
    const errors = validationResult(req);
    return !errors.isEmpty();
  }

  /**
   *
   *
   * @static
   * @param {Request} req
   * @param {Response} res
   * @returns
   * @memberof ValidationErrorHandler
   */
  public static sendErrors(req: Request, res: Response) {
    const errors = validationResult(req);
    return res.status(422).json({ errors: errors.array() });
  }
}