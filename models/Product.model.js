const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        
    },
    costprice:{
        type:Number,
        required:true,
    },
    saleprice:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:false,
    },
    stock:{
        type:Number,
        required:true,
    },
    images:{
        type:[String],
        required:false,
    }
}, { timestamps: true });



const Product = mongoose.model('Product', productSchema);

module.exports = Product;