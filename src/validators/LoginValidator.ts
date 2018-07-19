import { check } from "express-validator/check";
import { RequestHandler } from "express";

import { User } from "../models/UserModel";
import { BaseValidationMiddleware } from "./BaseValidationMiddleware";


/**
 * Login validator class to check login parameter before proceeding.
 *
 * @export
 * @class LoginValidatorMiddleware
 * @extends {BaseValidationMiddleware}
 */
export class LoginValidatorMiddleware extends BaseValidationMiddleware {
  /**
   * Validates the login parameters: username and password.
   * Also check the username in db if exists before proceeding.
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof LoginValidatorMiddleware
   */
  public static login(): RequestHandler[] {
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