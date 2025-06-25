const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route: Register user
app.post('/register', (req, res) => {
  const { id, name, email, mobile } = req.body;

  if (!id || !name || !email || !mobile) {
    return res.status(400).send('Missing required fields.');
  }

  db.query(
    'INSERT INTO users (id, name, email, mobile) VALUES (?, ?, ?, ?)',
    [id, name, email, mobile],
    (err, result) => {
      if (err) {
        console.error('Registration Error:', err);
        return res.status(500).send('Error registering user.');
      }
      // Redirect to success page
      res.redirect('https://dharani150643.github.io/user-admin-frontend/success.html');
    }
  );
});

// Route: Admin login & get users
app.post('/admin', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin123') {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        console.error('DB Fetch Error:', err);
        return res.status(500).send('Error fetching users');
      }
      res.json(results);
    });
  } else {
    res.status(401).send('Invalid admin credentials');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
