const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authenticateToken = require('../middleware/authenticateToken');


router.post("/product", authenticateToken, (req, res) => {
    const product = new Product(req.body);
    product
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


router.get("/product", authenticateToken, (req, res) => {
    Product
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


router.get("/product/:id", authenticateToken, (req, res) => {
    const { id } = req.params;
    Product
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


router.delete("/product/:id", authenticateToken, (req, res) => {
    const { id } = req.params;
    Product
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.put("/product/:id", authenticateToken, (req, res) => {
    const { id } = req.params;
    const { name, image, description, price, quantity } = req.body;
    Product
        .updateOne({ _id: id }, { $set: { name, image, description, price, quantity } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;