const express = require('express');
const SellData = require('../../models/sellcodeModel/sellGetModel');

const router = express.Router();

// GET API to retrieve data from MongoDB
router.get('/sell', async (req, res) => {
    try {
        const userId = req.query.userId;

        let sellData;
        if (userId) {
            // If userId is provided, find data for that specific user
            sellData = await SellData.find({ user: userId });
        } else {
            // If no userId is provided, return all data
            sellData = await SellData.find();
        }

        res.status(200).json(sellData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;



// If create index of every data

// const express = require('express');
// const SellData = require('../../models/sellcodeModel/sellGetModel');

// const router = express.Router();

// // GET API to retrieve data from MongoDB
// router.get('/sell', async (req, res) => {
//     try {
//         const userId = req.query.userId;

//         let sellData;
//         if (userId) {
//             sellData = await SellData.find({ user: userId });
//         } else {
//             // If no userId is provided, return all data
//             sellData = await SellData.find();
//         }

//         // Create an object where each item is indexed by a key
//         const indexedData = sellData.reduce((acc, item, index) => {
//             acc[index + 1] = [item];
//             return acc;
//         }, {});

//         res.status(200).json(indexedData);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;
