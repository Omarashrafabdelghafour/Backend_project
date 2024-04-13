const express = require('express');
const bcrypt = require('bcrypt');
const collection = require("./config");

const app = express();
const port = 5000;

app.use(express.json());

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === 'Admin_123' && password === 'Admin_123') {
      res.redirect('/admin');
    } else {
      // Check if the user exists
      const user = await collection.findOne({ username });

      if (!user) {
        return res.status(400).json({ error: 'Invalid username or password please' });
      }

      // Check if the password is valid
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }

      // Authentication successful for regular users
      res.json({ message: 'Login successful' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Registration route
app.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await collection.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new collection({ username, password: hashedPassword, email });

    await newUser.save();

    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Admin page route
app.get('/admin', (req, res) => {
  res.send('Welcome to the Admin page!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});