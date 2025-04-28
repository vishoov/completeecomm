const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
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
    },
    address:{
        type:String,
        required:false,
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending", "confirmed", "shipped", "delivered", "cancelled"],
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
