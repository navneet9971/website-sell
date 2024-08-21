const express = require('express');
const axios = require('axios');
const router = express.Router();

const fetchBankDetailsFromIfsc = async (ifscCode) => {
    try {
      const response = await axios.get(`https://ifsc.razorpay.com/${ifscCode}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data : 'Error fetching data from Razorpay IFSC Code API');
    }
  };


router.get('/banks/:ifsc',  async (req, res) => {
  const ifscCode = req.params.ifsc;
  console.log(`Received IFSC code: ${ifscCode}`); 
  try {
    const data = await fetchBankDetailsFromIfsc(ifscCode);
    res.json(data);
  } catch (error) {
    console.error(`Error fetching bank details: ${error.message}`); // Log the error
    res.status(500).json({ error: error.message || 'Error fetching bank details from Bank Details API' });
  }
});

module.exports = router;
