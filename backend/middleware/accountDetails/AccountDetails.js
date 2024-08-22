const express = require('express');
const router = express.Router();
const verifyToken = require('../../models/verifyToken/verifyToken')
const Account = require('../../models/saveBankDetails/UserBankDetails');
const Auth = require('../../models/authModel/Auths');

router.use(express.json());

router.post('/save-details', verifyToken, async( req, res ) => {
    try {
        const {
            accountNumber,
            accountName,
            bankName,
            branchName,
            ifscCode,
            city,
            district,
            state,
            address,
        } = req.body;

console.log(req.body)

 // Validate user authentication
 const { id } = req.authData;
 const user = await Auth.findById(id);

 if (!user) {
   console.error('User not found:', id);
   return res.status(401).json({ error: 'Unauthorized' });
 }

 const newBankDetails = new Account({
    accountNumber,
    accountName,
    bankName,
    branchName,
    ifscCode,
    city,
    district,
    state,
    address,
    user: user._id,
    createdAt : new Date().toISOString(), 
 })

await newBankDetails.save();

return res.status(200).json({
    message: 'Bank details saved successfully',
    data: newBankDetails,
})

    } catch (error) {
        console.error('Error saving bank details:', error);
        return res.status(500).json({ error: 'Server is down' });
    }
})

module.exports = router;