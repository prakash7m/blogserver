import * as bodyParser from 'body-parser';
import "reflect-metadata";
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import mongoose from 'mongoose';
import session from 'express-session';
// declare metadata by @controller annotation
import "./controllers/FooController";
import "./controllers/UserController";
import "./controllers/LoginController";

import { FooService } from './services/FooService';
import { UserService } from './services/UserService';
import { ErrorHandler } from './lib/ErrorHandler';
import { ValidationErrorHandler } from './lib/ValidationErrorHandler';


mongoose.connect("mongodb://localhost/blog");
// set up container
let container = new Container();

// set up bindings
container.bind<FooService>('FooService').to(FooService);
container.bind<UserService>('UserService').to(UserService);
container.bind<ErrorHandler>('ErrorHandler').to(ErrorHandler);
container.bind<ValidationErrorHandler>('ValidationErrorHandler').to(ValidationErrorHandler);

//Middleware bindings

// create server
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });
  // add body parser
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
  }));
});

let app = server.build();
app.listen(3000);