import { check } from 'express-validator/check';
import { BaseValidationMiddleware } from "./BaseValidationMiddleware";
import { sanitizeParam } from 'express-validator/filter';
import { User } from "../models/UserModel";

/**
 *
 *
 * @export
 * @class UserValidationMiddleware
 * @extends {BaseValidationMiddleware}
 */
export class UserValidationMiddleware extends BaseValidationMiddleware {
  /**
   *
   *
   * @static
   * @returns {*}
   * @memberof UserValidationMiddleware
   */
  public static fetch(): any {
    return [
      ...super.checkIdExists(User, 'User not found.'),
      super.sendErrors()
    ];
  }

  /**
   *
   *
   * @static
   * @returns {*}
   * @memberof UserValidationMiddleware
   */
  public static list(): any {
    return [
      sanitizeParam('page').toInt(),
      check('page').optional().isInt().withMessage("Invalid page parameter"),
      super.sendErrors()
    ];
  }

  /**
   *
   *
   * @static
   * @returns {*}
   * @memberof UserValidationMiddleware
   */
  public static create(): any {
    return [
      check('email').isEmail().withMessage("Not a valid email address"),
      check('username').isLength({ min: 5 }).withMessage("Should be min 5 characters"),
      check('username').isAlphanumeric().withMessage("Should be alphanumeric"),
      check('password').isLength({ min: 2 }).withMessage("Should be min 2 chars"),
      super.sendErrors()
    ];
  }

  /**
   *
   *
   * @static
   * @returns {*}
   * @memberof UserValidationMiddleware
   */
  public static update(): any {
    return [
      ...super.checkIdExists(User, 'User not found.'),
      check('email').isEmail().withMessage("Not a valid email address"),
      check('username').isLength({ min: 5 }).withMessage("Should be min 5 characters"),
      check('username').isAlphanumeric().withMessage("Should be alphanumeric"),
      super.sendErrors()
    ];
  }

  /**
   *
   *
   * @static
   * @returns {*}
   * @memberof UserValidationMiddleware
   */
  public static remove(): any {
    return [
      ...super.checkIdExists(User, 'User not found.'),
      super.sendErrors()
    ];
  }
}
