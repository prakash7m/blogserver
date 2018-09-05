import { check } from 'express-validator/check';
import { RequestHandler } from 'express';
import { sanitizeParam } from 'express-validator/filter';

import { BaseValidationMiddleware } from "./BaseValidationMiddleware";
import { Gallery } from "../models/GalleryModel";


/**
 * Gallery operation validator class. Has different static methods to validate fetch, list, create, update and remove
 *
 * @export
 * @class GalleryValidationMiddleware
 * @extends {BaseValidationMiddleware}
 */
export class GalleryValidationMiddleware extends BaseValidationMiddleware {
  /**
   * Validates if gallery exists before proceeding.
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof GalleryValidationMiddleware
   */
  public static fetch(): RequestHandler[] {
    return [
      super.checkIdExists(Gallery, 'Gallery not found.'),
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
   * @memberof GalleryValidationMiddleware
   */
  public static list(): RequestHandler[] {
    return [
      sanitizeParam('page').toInt(),
      check('page').optional().isInt().withMessage("Invalid page parameter"),
      super.sendErrors()
    ];
  }

  /**
   * Validates the filename, name.
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof GalleryValidationMiddleware
   */
  public static create(): RequestHandler[] {
    return [      
      super.sendErrors()
    ];
  }

  /**
   * Checks if gallery exists, and if yes, validates the update parameters before proceeding.
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof GalleryValidationMiddleware
   */
  public static update(): RequestHandler[] {
    return [
      super.checkIdExists(Gallery, 'Gallery not found.'),
      check('name').isLength({ min: 2 }).withMessage("Should be min 2 characters"),
      check('name').isAlphanumeric().withMessage("Should be alphanumeric"),      
      super.sendErrors()
    ];
  }

  /**
   * Checks if gallery exists before removing.
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof GalleryValidationMiddleware
   */
  public static remove(): RequestHandler[] {
    return [
      super.checkIdExists(Gallery, 'Gallery not found.'),
      super.sendErrors()
    ];
  }
}
