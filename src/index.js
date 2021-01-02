const express = require('express');
const cors = require('cors');


const createServer = async () => {
  try {
    const app = express();

    app.use(cors());

    app.use(express.json());

    app.use('/api/contacts', contactsRouter);

    app.listen(3000, () => console.log(`\x1B[33mServer listening on port: 3000... \x1b[0m`));
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

createServer();
