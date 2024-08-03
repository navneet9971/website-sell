require('dotenv').config(); // Load environment variables

const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

// Use the server-side secret key
const clerkSecretKey = process.env.CLERK_SECRET_KEY;
if (!clerkSecretKey) {
  throw new Error('CLERK_SECRET_KEY is not defined in environment variables');
}

const clerk = ClerkExpressWithAuth({
  apiKey: clerkSecretKey,
  // Other configuration options if necessary
 
});

module.exports = clerk;
