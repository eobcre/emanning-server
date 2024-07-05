const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const repoRouter = require('./routes/repo');

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', repoRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});