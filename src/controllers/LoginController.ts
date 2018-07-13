import { BaseHttpController, controller, httpPost } from "inversify-express-utils";
import { UserService } from "../services/UserService";
import { ErrorHandler } from "../lib/ErrorHandler";
import { inject } from "inversify";
import { LoginValidatorMiddleware } from "../validators/LoginValidator";
import { NextFunction, Request, Response } from "express";

/**
 *
 *
 * @export
 * @class LoginController
 * @extends {BaseHttpController}
 */
@controller("/login")
export class LoginController extends BaseHttpController {
  /**
   *Creates an instance of LoginController.
   * @param {UserService} userService
   * @param {ErrorHandler} errorHandler
   * @memberof LoginController
   */
  constructor(
    @inject('UserService') private userService: UserService,
    @inject('ErrorHandler') private errorHandler: ErrorHandler
  ) {
    super();
  }

  /**
   *
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof LoginController
   */
  @httpPost("/", ...LoginValidatorMiddleware.login())
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const isValid = await this.userService.checkPassword(username, password);
      if (isValid) {
        res.status(200).json({ data: {msg: "Logged in successfully"} });
      } else {
        res.status(400).json({ data: {msg: "Login failed"} });
      }
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }
}