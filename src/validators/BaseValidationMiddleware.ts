import { Request, Response, NextFunction } from "express";
import { validationResult, check } from "express-validator/check";

/**
 *
 *
 * @export
 * @class BaseValidationMiddleware
 */
export class BaseValidationMiddleware {
  /**
   *
   *
   * @static
   * @returns
   * @memberof BaseValidationMiddleware
   */
  public static sendErrors() {
    return (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      next();
    }
  }

  /**
   *
   *
   * @static
   * @param {*} model
   * @param {string} msg
   * @returns
   * @memberof BaseValidationMiddleware
   */
  public static checkIdExists(model: any, msg: string) {
    return [
      check('id').custom((id: string) => {
        return model.findById(id);
      }).withMessage(msg)
    ];
  }
}
