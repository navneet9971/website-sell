const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Webhook } = require('svix');

const getSellData = require('./middleware/sellcodeform/sellcodeGet');
const sellRoute = require('./middleware/sellcodeform/sellcodePost');
const User = require('./models/userModel/user');  // Ensure this matches the case of your filename

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

app.post(
  '/api/webhooks',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    console.log('Webhook received');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body.toString());

    try {
      const payloadString = req.body.toString();
      const svixHeaders = {
        'svix-id': req.headers['svix-id'],
        'svix-signature': req.headers['svix-signature'],
        'svix-timestamp': req.headers['svix-timestamp'],
      };
      const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
      const evt = wh.verify(payloadString, svixHeaders);

      const { id, ...attributes } = evt.data;
      const eventType = evt.type;

      if (eventType === 'user.created') {
        const firstName = attributes.first_name;
        const lastName = attributes.last_name;

        console.log(`User Created: ${firstName} ${lastName}`);

        const user = new User({
          clerkId: id,
          firstName: firstName,
          lastName: lastName,
        });

        await user.save();
        console.log('User was created');
      }

      res.status(200).json({
        success: true,
        message: 'Webhook received',
      });
    } catch (err) {
      console.error('Webhook verification error:', err.message);
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
);

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
