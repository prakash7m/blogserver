import helmet from "helmet";
import bodyParser from "body-parser";
import session from 'express-session';
import cors from "cors";
import cookieParser from "cookie-parser";
import connectMongo from "connect-mongo";
import mongoose from "mongoose";
import fileUpload  from "express-fileupload";

import { sessionSecret, sessionMaxAge, corsEnableFor } from './config';
import { passportInit } from './passport';
import { Request, Response, NextFunction } from "express";

const MongoStore = connectMongo(session);
/**
 * Configure the express app with various middlewares
 *
 * @param {*} app
 */
export const appConfig = function (app: any) {
  /**
   * Enable the cors access to the defined frontend
   */
  var corsOptions = {
    origin: corsEnableFor,

    // Credentials true is required for the cookie to be set in the browser
    // and send back to the request.    
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(cors(corsOptions));
  /**
   * Use helmet to have basic security
   * More details at https://github.com/helmetjs/helmet
   */
  app.use(helmet());

  app.use(cookieParser());

  /**
   * Use body parser to parse the request body
   * We are using json parser
   * More details at https://github.com/expressjs/body-parser
   */
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  /**
   * This is used for the session mgmt in express.
   * The default store used for session is Memory Store. Which is not recommended for prod.
   * Please see more detail at https://github.com/expressjs/session for other available stores for prod.
   */
  const sess = {
    secret: sessionSecret,
    resave: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    saveUninitialized: false,
    cookie: { secure: false, maxAge: sessionMaxAge * 1000 }
  };
  if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
    sess.cookie.secure = true;
  }
  app.use(session(sess));

  /**
   * Initialize the passport authentication middlewares
   */
  passportInit(app);

  app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    safeFileNames: true
  }));
  /**
   * Error handler middleware
   */
  app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
}