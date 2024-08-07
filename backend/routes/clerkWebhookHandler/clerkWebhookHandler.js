const express = require('express');
const { Webhook } = require('svix');
const router = express.Router();
const User = require('../../models/userModel/user');

router.use(express.json());

router.post('/webhooks', async (req, res) => {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return res.status(500).json({ success: false, message: "Server configuration error: WEBHOOK_SECRET is missing" });
  }

  const headers = req.headers;
  const payload = req.body;
  const payloadString = JSON.stringify(payload);

  console.log("Headers:", headers);
  console.log("Payload:", payloadString);

  const svix_id = headers["svix-id"];
  const svix_timestamp = headers["svix-timestamp"];
  const svix_signature = headers["svix-signature"];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ success: false, message: "Error: Missing svix headers" });
  }

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(payloadString, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.log("Error verifying webhook:", err.message);
    return res.status(400).json({ success: false, message: err.message });
  }

  console.log("Webhook data:", evt.data);

  const { id, first_name: firstName, last_name: lastName, email_addresses } = evt.data;
  const eventType = evt.type;

  console.log(`Event ID: ${id}`);
  console.log(`Event Type: ${eventType}`);
  console.log(`First Name: ${firstName}`);
  console.log(`Last Name: ${lastName}`);
  console.log("Email Addresses:", email_addresses);

  if (eventType === 'user.created') {
    if (firstName && lastName) {
      const user = new User({
        clerkUserId: id,
        firstName: firstName,
        lastName: lastName,
        email: email_addresses[0]?.email_address,
      });

      try {
        await user.save();
        res.status(201).json({ success: true, message: "User created successfully" });
      } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ success: false, message: "Error saving user to database", details: error.message });
      }
    } else {
      console.error("Error: First name or last name is missing");
      res.status(400).json({ success: false, message: "Error: First name or last name is missing" });
    }
  } else {
    res.status(200).json({ success: true, message: "Event received and processed" });
  }
});

module.exports = router;
