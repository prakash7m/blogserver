import { check } from 'express-validator/check';
import { RequestHandler } from 'express';
import { sanitizeParam } from 'express-validator/filter';

import { BaseValidationMiddleware } from "./BaseValidationMiddleware";
import { Subscriber } from "../models/SubscriberModel";


/**
 * Subscriber operation validator class. Has different static methods to validate fetch, list, create, update and remove
 *
 * @export
 * @class SubscriberValidationMiddleware
 * @extends {BaseValidationMiddleware}
 */
export class SubscriberValidationMiddleware extends BaseValidationMiddleware {
  /**
   * Validates if subscriber exists before proceeding.
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof SubscriberValidationMiddleware
   */
  public static fetch(): RequestHandler[] {
    return [
      super.checkIdExists(Subscriber, 'Subscriber not found.'),
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
   * @memberof SubscriberValidationMiddleware
   */
  public static list(): RequestHandler[] {
    return [
      sanitizeParam('page').toInt(),
      check('page').optional().isInt().withMessage("Invalid page parameter"),
      super.sendErrors()
    ];
  }

  /**
   * Validates the email, subscribername and password before creating subscriber.
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof SubscriberValidationMiddleware
   */
  public static create(): RequestHandler[] {
    return [
      check('email').isEmail().withMessage("Not a valid email address"),
      super.sendErrors()
    ];
  }

  /**
   * Checks if subscriber exists, and if yes, validates the update parameters before proceeding.
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof SubscriberValidationMiddleware
   */
  public static update(): RequestHandler[] {
    return [
      super.checkIdExists(Subscriber, 'Subscriber not found.'),
      check('email').isEmail().withMessage("Not a valid email address"),
      super.sendErrors()
    ];
  }

  /**
   * Checks if subscriber exists before removing.
   *
   * @static
   * @returns {RequestHandler[]}
   * @memberof SubscriberValidationMiddleware
   */
  public static remove(): RequestHandler[] {
    return [
      super.checkIdExists(Subscriber, 'Subscriber not found.'),
      super.sendErrors()
    ];
  }
}
