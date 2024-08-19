const admin = require('firebase-admin');
const serviceAccount = require('../sell-code-firebase-adminsdk-r3ih9-109458c447.json'); // Path to your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'code-sell.appspot.com' // Replace with your Firebase Storage bucket name
});

const bucket = admin.storage().bucket();
module.exports = bucket;
