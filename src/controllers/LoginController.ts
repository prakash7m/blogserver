import { BaseHttpController, controller, httpPost, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { NextFunction, Request, Response } from "express";

import { UserService } from "../services/UserService";
import { ErrorHandler } from "../lib/ErrorHandler";
import { LoginValidatorMiddleware } from "../validators/LoginValidator";
import { AuthService } from "../services/AuthService";

/**
 *
 *
 * @export
 * @class LoginController
 * @extends {BaseHttpController}
 */
@controller("/api")
export class LoginController extends BaseHttpController {
  /**
   *Creates an instance of LoginController.
   * @param {UserService} userService
   * @param {ErrorHandler} errorHandler
   * @memberof LoginController
   */
  constructor(
    @inject('UserService') private userService: UserService,
    @inject('ErrorHandler') private errorHandler: ErrorHandler,
    @inject('AuthService') private authService: AuthService
  ) {
    super();
  }

  /**
   * Login
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof LoginController
   */
  @httpPost("/login")
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authService.login(req, res);
      res.status(200).json({success: true, message: "Authentication success"});
    } catch (err) {
      res.status(401).json({success: false, message: "Authentication failed"});
    }
  }

  /**
   * Logout
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof LoginController
   */
  @httpGet("/logout")
  public async logout(req: Request, res: Response, next: NextFunction) {
    req.logOut();
    res.status(200).json({ success: true })
  }
}