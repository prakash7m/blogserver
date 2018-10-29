import { check } from 'express-validator/check';
import { RequestHandler } from 'express';
import { sanitizeParam } from 'express-validator/filter';

import { BaseValidationMiddleware } from "./BaseValidationMiddleware";
import { Post } from "../models/PostModel";


/**
 * Post operation validator class. Has different static methods to validate fetch, list, create, update and remove
 *
 * @export
 * @class PostValidationMiddleware
 * @extends {BaseValidationMiddleware}
 */
export class PostValidationMiddleware extends BaseValidationMiddleware {
  /**
   * Validates if post exists before proceeding.
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof PostValidationMiddleware
   */
  public static fetch(): RequestHandler[] {
    return [
      //super.checkIdExists(Post, 'Post not found.'),
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
   * @memberof PostValidationMiddleware
   */
  public static list(): RequestHandler[] {
    return [
      sanitizeParam('page').toInt(),
      check('page').optional().isInt().withMessage("Invalid page parameter"),
      super.sendErrors()
    ];
  }

  /**
   * Validates the email, postname and password before creating post.
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof PostValidationMiddleware
   */
  public static create(): RequestHandler[] {
    return [
      check('title').isLength({ min: 5 }).withMessage("Should be min 5 characters"),      
      check('slug').isLength({ min: 5 }).withMessage("Should be min 5 characters"),
      super.sendErrors()
    ];
  }

  /**
   * Checks if post exists, and if yes, validates the update parameters before proceeding.
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof PostValidationMiddleware
   */
  public static update(): RequestHandler[] {
    return [
      super.checkIdExists(Post, 'Post not found.'),
      check('title').isLength({ min: 5 }).withMessage("Should be min 5 characters"),      
      check('slug').isLength({ min: 5 }).withMessage("Should be min 5 characters"),
      super.sendErrors()
    ];
  }

  /**
   * Checks if post exists before removing.
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof PostValidationMiddleware
   */
  public static remove(): RequestHandler[] {
    return [
      super.checkIdExists(Post, 'Post not found.'),
      super.sendErrors()
    ];
  }
}
