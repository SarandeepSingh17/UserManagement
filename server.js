const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
// ...

// Use cors middleware
app.use(cors());

// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());

// Sample user data
let users = [
  { id: 1, username: 'user1', email: 'user1@example.com' },
  { id: 2, username: 'user2', email: 'user2@example.com' },
  // Add more user data as needed
];

// Define a route to get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Define a route to handle account creation (POST request)
app.post('/api/createAccount', (req, res) => {
  const { username, password } = req.body;

  // Basic validation (you may want to add more robust validation)
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  // Handle account creation logic here
  const newUser = {
    id: users.length + 1,
    username,
    email: `${username.toLowerCase()}@example.com`, // Placeholder email generation
  };

  users.push(newUser);

  // Send the updated user list to the client
  res.json(users);
});

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
