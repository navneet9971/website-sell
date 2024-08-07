const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
// const clerkMiddleware = require('./middleware/authenticateJWT/clerkConfig');
// const webhookHandler = require('./routes/clerkWebhookHandler/clerkWebhookHandler');
const getSellData = require('./middleware/sellcodeform/sellcodeGet');
const sellRoute = require('./middleware/sellcodeform/sellcodePost');


const login = require('./middleware/auth/login');
const signup = require('./middleware/auth/signup');
const profile = require('./middleware/auth/profile');


const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// // Apply Clerk middleware globally or on specific routes
// app.use(clerkMiddleware);



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



// Route for authentication
app.use('/api', login);
app.use('/api', signup);
app.use('/api', profile)


// Route handlers
app.use('/api', getSellData);
app.use('/api', sellRoute);
// app.use('/api', webhookHandler);

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
