import { BaseValidationMiddleware } from "./BaseValidationMiddleware";
import { check } from "express-validator/check";
import { User } from "../models/UserModel";

/**
 *
 *
 * @export
 * @class LoginValidatorMiddleware
 * @extends {BaseValidationMiddleware}
 */
export class LoginValidatorMiddleware extends BaseValidationMiddleware {
  /**
   *
   *
   * @static
   * @returns {*}
   * @memberof LoginValidatorMiddleware
   */
  public static login(): any {
    return [
      check('username').not().isEmpty().withMessage("Username is required"),
      check('password').not().isEmpty().withMessage("Password is required"),
      check('username').custom(username => {
        return User.findOne({ username });
      }).withMessage("Username or password invalid"),
      super.sendErrors()
    ]
  }
}