const express = require('express');
const fs = require('fs');
const uuid = require('uuid').v4;
const serveStatic = require('serve-static');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { handleGlobalErrors } = require('./helpers/globalErrorHandler');
const { connectToDB } = require('./db/db');
const { resultsRouter } = require('./modules/results/results.router');
const { tasksRouter } = require('./modules/tasks/tasks.router');
const { authRouter } = require('./modules/auth/auth.router');
const { rootRouter } = require('./modules/root/root.router');
const { ResWithMessage } = require('./helpers/responses');
const userModel = require('./modules/auth/auth.service');
const resultModel = require('./modules/results/results.service');

const PORT = process.env.PORT || 9090;

const staticServehandler = serveStatic(`public`, {
  index: ['index.html', 'index.htm'],
  extensions: ['html', 'htm'],
});

const sessionConfig = {
  SESS_NAME: 'game-catch',
  SESS_SECRET: process.env.SESSION_KEY || 'sjdahdo9asdyas7ydo87tas7id6taus5rd',
  NODE_ENV: process.env.NODE_ENV === 'production',
  COOKIE_MA: process.env.COOKIE_MA || 1000 * 60 * 60 * 60,
};

const init = async () => {
  try {
    const app = express();
    connectToDB().then(() => console.log('MongoDB succesfuly connected!'));
    app.set('trust proxy', true);
    app.set('view engine', 'pug');
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(
      session({
        genid: function (req) {
          return uuid();
        },
        name: sessionConfig.SESS_NAME,
        secret: sessionConfig.SESS_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: sessionConfig.NODE_ENV,
          maxAge: sessionConfig.COOKIE_MA,
        },
      }),
    );

    app.use(staticServehandler);

    app.use('/', rootRouter);
    app.use('/auth', authRouter);
    app.use('/api/results', resultsRouter);
    app.use('/api/tasks', tasksRouter);

    app.use(handleGlobalErrors);

    app.listen(PORT, () => console.log(`\x1B[35mServer listening on port: ${PORT}... \x1b[0m`));
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

init();
