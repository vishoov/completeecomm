const router = require('express').Router();
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const auth = require('../auth/user.auth');


router.get("/", auth, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}    
)

router.post("/signup", async (req, res)=>{
    try{
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        //create a token
        res.status(201).json(user);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
});


router.post("/login", async (req, res)=>{
    try{
        const { email, password } = req.body;
        //find the user
        const user = await User.findOne({email:email});
        //check if user exists
        if(!user) return res.status(404).json({ message: "User not found" });
        //check if password is correct
        if(user.password !== password) return res.status(401).json({ message: "Invalid credentials" });
        //create a token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        //return user
        res.status(200).json({ message: "Login successful", user, token:token });

    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
});

//rest of the routes


module.exports = router;