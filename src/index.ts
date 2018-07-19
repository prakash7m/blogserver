import "reflect-metadata";
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import mongoose from 'mongoose';

import "./controllers/UserController";
import "./controllers/LoginController";

import { UserService } from './services/UserService';
import { ErrorHandler } from './lib/ErrorHandler';
import { ValidationErrorHandler } from './lib/ValidationErrorHandler';
import { appConfig } from './config/AppConfig';
import { mongoDBURL } from "./config/config";
import { AuthService } from "./services/AuthService";

/**
 * Connect to mongo db.
 */
mongoose.connect(mongoDBURL, { useNewUrlParser: true });

// set up container
let container = new Container();

// set up bindings
container.bind<UserService>('UserService').to(UserService);
container.bind<ErrorHandler>('ErrorHandler').to(ErrorHandler);
container.bind<ValidationErrorHandler>('ValidationErrorHandler').to(ValidationErrorHandler);
container.bind<AuthService>('AuthService').to(AuthService);


/**
 * Create inversify express server
 */
let server = new InversifyExpressServer(container);
server.setConfig(appConfig);

let app = server.build();
app.listen(3000);