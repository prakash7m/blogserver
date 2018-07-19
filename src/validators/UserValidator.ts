import { check } from 'express-validator/check';
import { RequestHandler } from 'express';
import { sanitizeParam } from 'express-validator/filter';

import { BaseValidationMiddleware } from "./BaseValidationMiddleware";
import { User } from "../models/UserModel";


/**
 * User operation validator class. Has different static methods to validate fetch, list, create, update and remove
 *
 * @export
 * @class UserValidationMiddleware
 * @extends {BaseValidationMiddleware}
 */
export class UserValidationMiddleware extends BaseValidationMiddleware {
  /**
   * Validates if user exists before proceeding.
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof UserValidationMiddleware
   */
  public static fetch(): RequestHandler[] {
    return [
      super.checkIdExists(User, 'User not found.'),
      super.sendErrors()
    ];
  }

  /**
   * Validates the page parameter.
   * Tries to cast the page to int if any.
   * If invalid page parameter (optional), it prevents proceeding.
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof UserValidationMiddleware
   */
  public static list(): RequestHandler[] {
    return [
      sanitizeParam('page').toInt(),
      check('page').optional().isInt().withMessage("Invalid page parameter"),
      super.sendErrors()
    ];
  }

  /**
   * Validates the email, username and password before creating user.
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof UserValidationMiddleware
   */
  public static create(): RequestHandler[] {
    return [
      check('email').isEmail().withMessage("Not a valid email address"),
      check('username').isLength({ min: 5 }).withMessage("Should be min 5 characters"),
      check('username').isAlphanumeric().withMessage("Should be alphanumeric"),
      check('password').isLength({ min: 2 }).withMessage("Should be min 2 chars"),
      super.sendErrors()
    ];
  }

  /**
   * Checks if user exists, and if yes, validates the update parameters before proceeding.
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof UserValidationMiddleware
   */
  public static update(): RequestHandler[] {
    return [
      super.checkIdExists(User, 'User not found.'),
      check('email').isEmail().withMessage("Not a valid email address"),
      check('username').isLength({ min: 5 }).withMessage("Should be min 5 characters"),
      check('username').isAlphanumeric().withMessage("Should be alphanumeric"),
      super.sendErrors()
    ];
  }

  /**
   * Checks if user exists before removing.
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof UserValidationMiddleware
   */
  public static remove(): RequestHandler[] {
    return [
      super.checkIdExists(User, 'User not found.'),
      super.sendErrors()
    ];
  }
}
