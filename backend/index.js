const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const getSellData = require('./middleware/sellcodeform/sellcodeGet');
const sellRoute = require('./middleware/sellcodeform/sellcodePost');
const login = require('./middleware/auth/login');
const signup = require('./middleware/auth/signup');
const profile = require('./middleware/auth/profile');
const addCart = require('./middleware/addCartMiddleware/addCartPost')
const addCartGet = require('./middleware/addCartMiddleware/addCartGet');


const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Authentication routes
app.use('/api', login);
app.use('/api', signup);
app.use('/api', profile);

// Application routes
app.use('/api', getSellData);
app.use('/api', sellRoute);

//add cart Routes
app.use('/api', addCart);
app.use("/api", addCartGet)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
