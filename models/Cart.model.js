const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        
    },
    products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true,
            },
            quantity:{
                type:Number,
                default:1,
            },
        }
    ],
    amount:{
        type:Number,
        default:0,
    }
}, { timestamps: true });



const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;


//2 types of data -> connect 
//cart -> userId -> already exists in the database but in different collection