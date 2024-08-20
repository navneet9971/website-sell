const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const getSellData = require('./middleware/sellcodeform/sellcodeGet');
const sellRoute = require('./middleware/sellcodeform/sellcodePost');
const login = require('./middleware/auth/login');
const signup = require('./middleware/auth/signup');
const profile = require('./middleware/auth/profile');
const addCart = require('./middleware/addCartMiddleware/addCartPost')
const addCartGet = require('./middleware/addCartMiddleware/addCartGet');
const addLike = require('./middleware/addLikeMiddleware/addLikePost');
const addLikeGet = require('./middleware/addLikeMiddleware/addLikeGet');
const userReviewPost = require('./middleware/userReviewMiddleware/userReviewPost');
const userReviewGet = require('./middleware/userReviewMiddleware/userReviewGet');
const userProfilePut = require('./middleware/userMiddlerWare/UserProfilePut');
// const userProfilePost = require('./middleware/userMiddlerWare/UserProfilePost')
const userProfileGet = require('./middleware/userMiddlerWare/UserProfileGet');
const programmingLanguge = require('./middleware/programmingLanguge/programmingLanguge')
const payment = require('./middleware/paymentController/PaymentInstance');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Authentication routes
app.use('/api', login);
app.use('/api', signup);
app.use('/api', profile);

//user Profile Get 
app.use('/api', userProfilePut)
// app.use('/api', userProfilePost)
app.use('/api', userProfileGet)


// Application routes
app.use('/api', getSellData);
app.use('/api', sellRoute);

//add cart Routes
app.use('/api', addCart);
app.use('/api', addCartGet)

//add Like Routes
app.use('/api', addLike);
app.use('/api', addLikeGet)

//add Review Routes
app.use('/api', userReviewPost)
app.use('/api', userReviewGet)

//show programming languges
app.use('/api', programmingLanguge)

//Payment 
app.use('/api', payment)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
