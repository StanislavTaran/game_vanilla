const express = require('express');
const fs = require('fs');
const serveStatic = require('serve-static');
const { resultsRouter } = require('./modules/results/results.router');

const PORT = process.env.PORT || 3000;

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

  app.listen(PORT, () =>
    console.log(`\x1B[35mServer listening on port: 3000... \x1b[0m`),
  );
} catch (e) {
  console.log(e);
  process.exit(1);
}
