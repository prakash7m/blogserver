import { controller, BaseHttpController, httpPost, httpGet, httpPut, httpDelete } from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response } from "express";

import { SubscriberService } from "../services/SubscriberService";
import { ErrorHandler } from "../lib/ErrorHandler";
import { SubscriberValidationMiddleware } from "../validators/SubscriberValidator";
import { authRequired } from "../config/passport";
import { Utils } from "../lib/Utils";

/**
 * The subscriber controller
 *
 * @export
 * @class SubscriberController
 * @extends {BaseHttpController}
 */
@controller("/api/subscriber", authRequired())
export class SubscriberController extends BaseHttpController {
  /**
   * Creates an instance of SubscriberController.
   * @param {SubscriberService} subscriberService
   * @param {ErrorHandler} errorHandler
   * @memberof SubscriberController
   */
  constructor(
    @inject('SubscriberService') private subscriberService: SubscriberService,
    @inject('ErrorHandler') private errorHandler: ErrorHandler
  ) {
    super();
  }

  /**
   * List
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof SubscriberController
   */
  @httpGet("/", ...SubscriberValidationMiddleware.list())
  public async list(req: Request, res: Response) {
    try {
      const list = await this.subscriberService.list(req.query.page);
      await Utils.sleep();
      res.status(200).json({ rows: list });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

  /**
   * Fetch
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof SubscriberController
   */
  @httpGet("/:id", ...SubscriberValidationMiddleware.fetch())
  public async fetch(req: Request, res: Response) {
    try {
      const item = await this.subscriberService.fetch(req.params.id);
      await Utils.sleep();
      res.status(200).json({ data: this.filter(item) });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

  /**
   * Create
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof SubscriberController
   */
  @httpPost("/", ...SubscriberValidationMiddleware.create())
  public async create(req: Request, res: Response) {
    try {
      const subscriber = await this.subscriberService.create(req.body);
      await Utils.sleep();
      res.status(200).json({ data: this.filter(subscriber) });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

  /**
   * Update
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof SubscriberController
   */
  @httpPut("/:id", ...SubscriberValidationMiddleware.update())
  public async update(req: Request, res: Response) {
    try {
      const subscriber = await this.subscriberService.update(req.params.id, req.body);
      await Utils.sleep();
      res.status(200).json({ data: this.filter(subscriber) });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

  /**
   * Remove
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof SubscriberController
   */
  @httpDelete("/:id", ...SubscriberValidationMiddleware.remove())
  public async remove(req: Request, res: Response) {
    try {
      const subscriber = await this.subscriberService.remove(req.params.id);
      await Utils.sleep();
      res.status(200).json({ data: this.filter(subscriber) });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

  private filter(subscriber) {
    const { _id, name, email, subscribed, created, updated } = subscriber;
    return { _id, name, email, subscribed, created, updated };
  }
}
