const express = require('express');
const fs = require('fs');
const uuid = require('uuid').v4;
const serveStatic = require('serve-static');
const cookieParser = require('cookie-parser');
var session = require('express-session');
const { resultsRouter } = require('./modules/results/results.router');
const { tasksRouter } = require('./modules/tasks/tasks.router');
const { authRouter } = require('./modules/auth/auth.router');
const { ResWithMessage } = require('./helpers/responses');
const { getUserById } = require('./modules/auth/auth.service');
const { getResults } = require('./modules/results/results.service');

const PORT = process.env.PORT || 9090;

const staticServehandler = serveStatic(`public`, {
  index: ['index.html', 'index.htm'],
  extensions: ['html', 'htm'],
});

const sessionConfig = {
  SESS_NAME: 'game-catch',
  SESS_SECRET: process.env.SESSION_KEY || 'sjdahdo9asdyas7ydo87tas7id6taus5rd',
  NODE_ENV: process.env.NODE_ENV === 'production',
  COOCKIE_MA: process.env.COOCKIE_MA || 1000 * 60 * 60 * 2,
};

try {
  const app = express();
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
        maxAge: sessionConfig.COOCKIE_MA,
      },
    }),
  );

  app.get('/', async function (req, res, next) {
    if (req.session.userId) {
      try {
        const [user, results] = await Promise.all([
          getUserById(req.session.userId),
          getResults(),
        ]);
        const sortedResults = results
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);
        const bestUserResult =
          results
            .filter(item => item.name === user.name)
            ?.sort((a, b) => b.score - a.score)[0] || 0;
        res.render('index', {
          userName: user.name,
          results: sortedResults,
          bestUserResult,
        });
      } catch (e) {
        next(new ResWithMessage(500, e.message));
      }
    } else res.render('login', { message: 'Please Log in', error: {} });
  });

  app.use(staticServehandler);

  app.use('/auth', authRouter);

  app.use('/api/results', resultsRouter);
  app.use('/api/tasks', tasksRouter);

  app.use((error, req, res, next) => {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json(error);
    console.log(error);
  });

  app.listen(PORT, () =>
    console.log(`\x1B[35mServer listening on port: ${PORT}... \x1b[0m`),
  );
} catch (e) {
  console.log(e);
  process.exit(1);
}
