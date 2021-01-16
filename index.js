const express = require('express');
const fs = require('fs');
const serveStatic = require('serve-static');
const { resultsRouter } = require('./modules/results/results.router');
const { tasksRouter } = require('./modules/tasks/tasks.router');

const PORT = process.env.PORT || 9090;

const staticServehandler = serveStatic('public', {
  index: ['index.html', 'index.htm'],
  extensions: ['html', 'htm'],
});

try {
  const app = express();

  app.use(staticServehandler);

  app.use((req, res, next) => {
    if (req.url.split('/')[1] === 'api') {
      next();
    } else {
      return res.status(404).sendFile('public/_404.html', { root: __dirname });
    }
  });

  app.use(express.json());

  app.use('/api/results', resultsRouter);
  app.use('/api/tasks', tasksRouter);

  app.use((error, req, res, next) => {
    if (!error.statusCode) error.statusCode = 500;
    res.status(error.statusCode).json(error);
  });

  app.listen(PORT, () => console.log(`\x1B[35mServer listening on port: ${PORT}... \x1b[0m`));
} catch (e) {
  console.log(e);
  process.exit(1);
}
