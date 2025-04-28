const router = require('express').Router();
const Review = require('../models/review.model');


router.post("/create", async (req, res)=>{
    try{
        const review = await Review.create(req.body);

        if(!review){
            return res.status(400).json({message:"Review not created"});
        }

        res.status(201).json(review);

    }
    catch(err){
        res.status(500).json(err);
    }
});

router.get("/product/:productId", async (req, res)=>{
    try{
        const reviews = await Review.find({productId: req.params.productId});
        if(!reviews){
            return res.status(404).json({message:"No reviews found"});
        }
        res.status(200).json(reviews);
    }catch(err){
        res.status(500).json(err);
    }
})


router.get("/user/:userId", async (req, res)=>{
    try{
        const reviews = await Review.find({userId: req.params.userId});
        if(!reviews){
            return res.status(404).json({message:"No reviews found"});
        }
        res.status(200).json(reviews);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;