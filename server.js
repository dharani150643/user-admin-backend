const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.post('/register', (req, res) => {
  const { name, email, mobile } = req.body;
  db.query('INSERT INTO users (name, email, mobile) VALUES (?, ?, ?)', [name, email, mobile], (err, result) => {
    if (err) return res.send('Error registering user.');
    res.send('User successfully registered!');
  });
});

app.post('/admin', (req, res) => {
  const { username, password } = req.body;
  // You can change this to check from DB too
  if (username === 'admin' && password === 'admin123') {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) return res.send('Error fetching users');
      res.json(results);
    });
  } else {
    res.status(401).send('Invalid admin credentials');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
