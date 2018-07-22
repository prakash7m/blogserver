import passport from "passport";
import passportLocal from "passport-local";
import { Request, Response, NextFunction, RequestHandler } from "express";

import { User, IUserModel } from "../models/UserModel";


const LocalStrategy = passportLocal.Strategy;

export const passportInit = (app: any) => {
  app.use(passport.initialize());
  app.use(passport.session());

  /**
   * Serialize the user object to save in session
   * Serialized as id
   */
  passport.serializeUser((user: IUserModel, done) => {
    done(null, user.id);
  });

  /**
   * Deserialize the session information to user.
   * Find the user in db and return user object
   */
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user: IUserModel) => {
      done(err, user);
    })
  });

  /**
   * Setup a location authentication model
   */
  passport.use('local-login', new LocalStrategy({
    usernameField: "username"
  }, (username: string, password: string, done) => {
    User.findOne({ username }, async function (err, user) {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (!await user.validatePassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  }));
}


/**
 * Middleware to check if a user is athenticated
 * Use this middleware in the controller to require authentication
 */
export const authRequired = (): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).send({ success: false, message: 'Authentication required' });
  }
}
