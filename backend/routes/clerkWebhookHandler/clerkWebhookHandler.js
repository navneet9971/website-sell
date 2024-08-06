// clerkWebhookHandler.js
const { Webhook } = require('svix');
const bodyParser = require('body-parser');
require('dotenv').config();

const webhookHandler = [
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
];

module.exports = webhookHandler;
