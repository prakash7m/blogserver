import { check } from 'express-validator/check';
import { RequestHandler } from 'express';
import { sanitizeParam } from 'express-validator/filter';

import { BaseValidationMiddleware } from "./BaseValidationMiddleware";
import { Category } from "../models/CategoryModel";


/**
 * Category operation validator class. Has different static methods to validate fetch, list, create, update and remove
 *
 * @export
 * @class CategoryValidationMiddleware
 * @extends {BaseValidationMiddleware}
 */
export class CategoryValidationMiddleware extends BaseValidationMiddleware {
  /**
   * Validates if category exists before proceeding.
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof CategoryValidationMiddleware
   */
  public static fetch(): RequestHandler[] {
    return [
      super.checkIdExists(Category, 'Category not found.'),
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
   * @memberof CategoryValidationMiddleware
   */
  public static list(): RequestHandler[] {
    return [
      sanitizeParam('page').toInt(),
      check('page').optional().isInt().withMessage("Invalid page parameter"),
      super.sendErrors()
    ];
  }

  /**
   * Validates the name, description
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof CategoryValidationMiddleware
   */
  public static create(): RequestHandler[] {
    return [
      check('name').isLength({ min: 2 }).withMessage("Should be min 2 characters"),
      super.sendErrors()
    ];
  }

  /**
   * Checks if user exists, and if yes, validates the update parameters before proceeding.
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof CategoryValidationMiddleware
   */
  public static update(): RequestHandler[] {
    return [
      super.checkIdExists(Category, 'Category not found.'),      
      check('name').isLength({ min: 2 }).withMessage("Should be min 2 characters"),
      super.sendErrors()
    ];
  }

  /**
   * Checks if category exists before removing.
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof CategoryValidationMiddleware
   */
  public static remove(): RequestHandler[] {
    return [
      super.checkIdExists(Category, 'Category not found.'),
      super.sendErrors()
    ];
  }
}
