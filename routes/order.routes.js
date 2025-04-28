const router = require('express').Router();
const Cart = require('../models/Cart.model');
const User = require('../models/User.model');
const { auth } = require('../auth/user.auth');
const Order = require('../models/Order.model');
// Create a new cart
router.post('/create', async (req, res)=>{
    try{
       
        const newOrder = await Order.create(req.body);

        if(!newOrder){
            return res.status(400).json({message:"Order not created"});
        }

        res.status(201).json(newOrder);

    }
    catch(err){
        res.status(500).json(err);
    }
});

router.put("/update/:id", async (req, res)=>{
    try{
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }
        res.status(200).json(order);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.get("/get/:id", async (req, res)=>{
    try{
        const order = await Order.findById(req.params.id);
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }
        res.status(200).json(order);
    }
    catch(err){
        res.status(500).json(err);
    }
})
    
router.post("/cancel/:id", async (req, res)=>{
    try{
        const order = await Order.findByIdAndUpdate(req.params.id, {status:"cancelled"}, {new:true});
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }
        res.status(200).json(order);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;