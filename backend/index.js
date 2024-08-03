// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const clerk = require('./middleware/clerkMiddleware/clerkMiddleware');
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

const getSellData = require('./middleware/sellcodeform/sellcodeGet');
const sellRoute = require('./middleware/sellcodeform/sellcodePost');
const userRoutes = require('./routes/userRoutes/userRoutes');



const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(clerk);
app.use(ClerkExpressWithAuth()); // Ensure Clerk middleware is used

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



app.use('/api', userRoutes);


// Use the sell data routes
app.use('/api', getSellData);
app.use('/api', sellRoute);




// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
