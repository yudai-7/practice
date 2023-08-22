const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/test', (req, res) => {
  const answers = req.body;
  let score = {
    Em: 0,
    Ex: 0,
    C: 0,
    A: 0,
    P: 0
  };

  for (const key in answers) {
    const val = answers[key];
    const category = key.slice(-2, -1);
    const isReversed = key.slice(-1) === "*";
    score[category] += isReversed ? 6 - parseInt(val) : parseInt(val);
  }

  res.render('result', { score });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});