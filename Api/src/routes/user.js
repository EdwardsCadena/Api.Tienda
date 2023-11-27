const express = require('express');
const router = express.Router();
const userSchema  = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authenticateToken = require('../middleware/authenticateToken');


router.post("/users", (req, res) => {
    console.log(req.body);
    const user = new userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


router.get("/users", authenticateToken, (req, res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.get("/users/:id", authenticateToken, (req, res) => {
    const { id } = req.params;
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


router.delete("/users/:id", authenticateToken, (req, res) => {
    const { id } = req.params;
    userSchema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


router.put("/users/:id", authenticateToken, (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, password, address, role } = req.body;
    userSchema
        .updateOne({ _id: id }, { $set: { firstName, lastName, email, password, address, role } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


router.post('/login', async (req, res) => {
    const user = await userSchema.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or password is incorrect.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Email or password is incorrect.');

    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

module.exports = router;