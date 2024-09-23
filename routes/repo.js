const express = require('express');
const router = express.Router();
const cors = require('cors');
require('dotenv').config();

router.use(
  cors({
    origin: 'https://emanning.dev',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  })
);
// router.use(cors());

// router.get('/', async (req, res) => {
//   try {
//     res.json('Reached to repo API router.');
//   } catch (error) {
//     console.error('Error reaching to repo API.', error);
//     res.status(500).json({ error: 'Error' });
//   }
// });

router.get('/repos', async (req, res) => {
  const repoURL = process.env.URL;

  try {
    const response = await fetch(repoURL);
    const data = await response.json();

    const targetRepos = ['emanning-web-ui', 'feedback-survey'];

    const filteredRepos = data.items.filter((repo) => targetRepos.includes(repo.name)).slice(0, 6);
    res.json(filteredRepos);

    // console.log('filteredRepos', filteredRepos);

    // const repos = data.items.slice(0, 6);
    // res.json(repos);
  } catch (error) {
    console.error('Error fetching data.', error);
    res.status(500).json({ error: 'Error fetching data.' });
  }
});

module.exports = router;
