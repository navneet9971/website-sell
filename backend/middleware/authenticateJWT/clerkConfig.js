// clerkConfig.js
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

const originalClerkMiddleware = ClerkExpressWithAuth({
  apiKey: process.env.CLERK_SECRET_KEY,
});

const clerkMiddleware = (req, res, next) => {
  originalClerkMiddleware(req, res, (err) => {
    if (err) {
      return next(err);
    }

    if (req.auth) {
      console.log('Session ID:', req.auth.sessionId);
      console.log('User ID:', req.auth.userId);
    } else {
      console.log('No auth information found');
    }

    next();
  });
};

module.exports = clerkMiddleware;
