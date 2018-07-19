import { Request, Response, NextFunction, RequestHandler } from "express";
import { validationResult, check } from "express-validator/check";

/**
 * Base class for the different validation middlewares
 *
 * @export
 * @class BaseValidationMiddleware
 */
export class BaseValidationMiddleware {

  /**
   * Sends the validation errors collected from all the validation rules applied.
   *
   * @static
   * @returns {RequestHandler}
   * @memberof BaseValidationMiddleware
   */
  public static sendErrors(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      next();
    }
  }


  /**
   * Checks if the id exists on a collection (model)
   *
   * @static
   * @param {*} model
   * @param {string} msg
   * @returns {RequestHandler[]}
   * @memberof BaseValidationMiddleware
   */
  public static checkIdExists(model: any, msg: string): RequestHandler {    
      return check('id').custom((id: string) => model.findById(id)).withMessage(msg)
  }
}
