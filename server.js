const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
// const repoRouter = require('./routes/repo');
const emailRouter = require('./routes/email');

dotenv.config();

app.use(cors({ origin: process.env.CLIENT_URL }));
// app.use(cors());
app.use(bodyParser.json());
// app.use('/api', repoRouter);
app.use('/api', emailRouter);

app.get('/api/repos', async (req, res) => {
  const repoURL = process.env.URL;

  try {
    const response = await fetch(repoURL);
    const data = await response.json();
    const repos = data.items.slice(0, 6);
    res.json(repos);
  } catch (error) {
    console.error('Error fetching data.', error);
    res.status(500).json({ error: 'Error fetching data.' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
