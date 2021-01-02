const express = require('express');
const serveStatic = require('serve-static');
const { resultsRouter } = require('./modules/results/results.router');

try {
  const app = express();

  app.use(serveStatic('public', { index: ['index.html', 'index.htm'] }));

  app.use(express.json());

  app.use('/api/results', resultsRouter);

  app.listen(3000, () =>
    console.log(`\x1B[33mServer listening on port: 3000... \x1b[0m`),
  );
} catch (e) {
  console.log(e);
  process.exit(1);
}
