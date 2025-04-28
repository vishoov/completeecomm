const router = require('express').Router();

const auth = require('../auth/user.auth');
const Product = require('../models/Product.model');

router.get("/", auth, async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}    
)

router.post("/create", auth, async (req, res)=>{
    try{
        const product = req.body;
        const Pro = await Product.create(product);
        //create a token
        res.status(201).json(Pro);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
});


router.get("/:id", auth, async (req, res)=>{
    try{
        //bestsellers -> /product/id
        const { id } = req.params;
        const product = await Product.findById(id);

        if(!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
})
//rest of the routes

router.get("/search/:name", async (req, res)=>{
    try{
        const { name } = req.params;
        // const product = await Product.find({name: name});

        //get all products with a certain keyword in the name
        const product = await Product.find({ name: { $regex: name } });
        
        // iphone -> i Phone -> iPhone -> iPhone 14 pro max
        //similar words -> parallely search -> outputs all the products with the same name


        //regex -> pattern match 
        //name -> word 

        if(!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json(product);

    }catch(err){
        res.status(500).json({ message: err.message });
    }
});

//update product
router.put("/:id", async (req, res)=>{
    try{
        const { id } = req.params;
        const updates = req.body;
        const product = await Product.findByIdAndUpdate(id, updates, { new: true });

        if(!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json(product);

    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
})

router.delete("/:id", async (req, res)=>{
    try{
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if(!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "Product deleted successfully" });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;