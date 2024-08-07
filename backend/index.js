const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const webhookHandler = require('./routes/clerkWebhookHandler/clerkWebhookHandler');
const getSellData = require('./middleware/sellcodeform/sellcodeGet');
const sellRoute = require('./middleware/sellcodeform/sellcodePost');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  });

// Test the server
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Use the sell data routes
app.use('/api', getSellData);
app.use('/api', sellRoute);

// Use the webhook handler
app.use('/api', webhookHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
