import { controller, BaseHttpController, httpPost, httpGet, httpPut, httpDelete } from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response } from "express";

import { UserService } from "../services/UserService";
import { ErrorHandler } from "../lib/ErrorHandler";
import { UserValidationMiddleware } from "../validators/UserValidator";
import { authRequired } from "../config/passport";

/**
 * The user controller
 *
 * @export
 * @class UserController
 * @extends {BaseHttpController}
 */
@controller("/api/user", authRequired())
export class UserController extends BaseHttpController {
  /**
   * Creates an instance of UserController.
   * @param {UserService} userService
   * @param {ErrorHandler} errorHandler
   * @memberof UserController
   */
  constructor(
    @inject('UserService') private userService: UserService,
    @inject('ErrorHandler') private errorHandler: ErrorHandler
  ) {
    super();
  }

  /**
   * List
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof UserController
   */
  @httpGet("/", ...UserValidationMiddleware.list())
  public async list(req: Request, res: Response) {
    try {
      const list = await this.userService.list(req.query.page);
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
   * @memberof UserController
   */
  @httpGet("/:id", ...UserValidationMiddleware.fetch())
  public async fetch(req: Request, res: Response) {
    try {
      const item = await this.userService.fetch(req.params.id);
      res.status(200).json({ data: item });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

  /**
   * Create
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof UserController
   */
  @httpPost("/", ...UserValidationMiddleware.create())
  public async create(req: Request, res: Response) {
    try {
      const user = await this.userService.create(req.body);
      res.status(200).json({ data: user });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

  /**
   * Update
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof UserController
   */
  @httpPut("/:id", ...UserValidationMiddleware.update())
  public async update(req: Request, res: Response) {
    try {
      const user = await this.userService.update(req.params.id, req.body);
      res.status(200).json({ data: user });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

  /**
   * Remove
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof UserController
   */
  @httpDelete("/:id", ...UserValidationMiddleware.remove())
  public async remove(req: Request, res: Response) {
    try {
      const user = await this.userService.remove(req.params.id);
      res.status(200).json({ data: user });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }
}
