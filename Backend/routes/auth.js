const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();
var jwt= require('jsonwebtoken');
const JWT_SECRET="SwapnanilRocks";
var fetchuser= require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator')

//ROUTE1: 
//Create a User using : POST"/api/auth/' Doesnt require login

router.post('/createuser', [
    body('name').isLength({ min: 5 }),
    body('email', 'Please enter valid email address').isEmail(),
], async (req, res) => {
    // If there are error, reeturn bad request and teh errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({
                error: "Sorry an user with same email already exists"
            })
        }
        //Password hashing is done using bcryptjs, and salt is added to it
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
        //create a user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        //     .then(user => res.json(user))
        //     .catch(error => {
        //       console.log(error)
        //       res.json({error: 'Please enter a unique value for email '})});
        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        console.log(authToken);
        //res.json({ "quote": "Good Boy" })
        res.json({authToken})
    }
    catch {
        console.error(errors.messaage);
        res.status(500).send("some error occured")
    }

})

module.exports = router
//express validator is used to validate the inputs and show error

//ROUTE 2:
//Time to authenticate the user

router.post('/login', [
    body('email', 'Please enter valid email address').isEmail(),
    body('password','Password Cannot be blank').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken});
    } catch (error) {
        console.error(errors.message);
        res.status(500).send("Some Internal Server error occurred");
    }
});

//ROUTE 3:
//Fetching User Details
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user= await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Server error occurred");
    }
});

