const router = require('express').Router();
const Cart = require('../models/Cart.model');
const User = require('../models/User.model');
const { auth } = require('../auth/user.auth');

// Create a new cart
router.post('/create', async (req, res)=>{
    try{
        const { userId, products } = req.body;
       
        

       
        const newCart = await Cart.create(req.body);

        if(!newCart){
            return res.status(400).json({message:"Cart not created"});
        }

        res.status(201).json(newCart);

    }
    catch(err){
        res.status(500).json(err);
    }
});

router.post("/addtocart", async (req, res)=>{
    try{

        const { userId, productId, saleprice } = req.body;
        const cart = await Cart.findOne({userId});

        if(!cart){
            return res.status(404).json({message:"Cart not found"});
        }

        const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId.toString());

        if(productIndex > -1){
            cart.products[productIndex].quantity += 1;
        }
        else{
            cart.products.push({productId, quantity: 1});
        }
        cart.amount += saleprice;
        await cart.save();
        res.status(200).json(cart);


    }
    catch(err){
        res.status(500).json(err);
    }
})

router.delete("/removecart/:id", async (req, res)=>{
    try{
        const cart = await Cart.findByIdAndDelete(req.params.id);
            console.log(cart);
            if(!cart){
                return res.status(404).json({message:"Cart not found"});
            }
    
            res.status(200).json({message:"Cart deleted successfully"});
        }
      

    
    catch(err){
        res.status(500).json(err);
    }
});


    router.get("/getcart/:userId", async (req, res)=>{
        try{
            const cart = await Cart.findOne({userId: req.params.userId});

            if(!cart){
                return res.status(404).json({message:"Cart not found"});
            }
            res.status(200).json(cart);
        }
        catch(err){
            res.status(500).json(err);
        }
    });

module.exports = router;