const express = require('express');
const router = express.Router();
const PurchaseHistory = require('../models/PurchaseHistory');
const authenticateToken = require('../middleware/authenticateToken');


router.post("/history", authenticateToken, (req, res) => {
    const purchaseHistory = new PurchaseHistory(req.body);
    purchaseHistory
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


router.get("/history", authenticateToken, (req, res) => {
    PurchaseHistory
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


router.get("/history/:id", authenticateToken, (req, res) => {
    const { id } = req.params;
    PurchaseHistory
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});



module.exports = router;