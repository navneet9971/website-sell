const Razorpay = require('razorpay');
const router = express.Router();
const verifyToken = require('../../models/verifyToken/verifyToken');
const Auth = require('../../models/authModel/Auths')

router.use(express.json());

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
})

router.post('/items-got', verifyToken, async( req, res ) => {
    try{
        const { itemId, buyerEmail, paymentMethod } = req.body;

        console.log('Request body:', req.body);

       

    }catch (error) {
        console.error('Error saving sell data:', error);
        if (error.message.includes('File too large')) {
          return res.status(400).json({ error: 'File size exceeds limit' });
        }
        return res.status(500).json({ error: 'Server is down', details: error.message });
      }
    
})