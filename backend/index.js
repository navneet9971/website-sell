// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Webhook } = require('svix');

const getSellData = require('./middleware/sellcodeform/sellcodeGet');
const sellRoute = require('./middleware/sellcodeform/sellcodePost');
// const webhookHandler = require('./routes/clerkWebhookHandler/clerkWebhookHandler');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

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
// app.use('/api', webhookHandler);

// Webhook endpoint
app.post(
  '/webhooks',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    try {
      const payloadString = req.body.toString();
      const svixHeader = req.headers;
      const wh = new Webhook(process.env.CREATE_WEBHOOK_SECRET_KEY);
      const evt = wh.verify(payloadString, svixHeader);

      const { id, ...attributes } = evt.data;
      const eventType = evt.type;

      if (eventType === 'user.created') {
        console.log(`User ${id} is ${eventType}`);
        console.log(attributes);
      }

      res.status(200).json({
        success: true,
        message: 'Webhook received'
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  }
);

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
