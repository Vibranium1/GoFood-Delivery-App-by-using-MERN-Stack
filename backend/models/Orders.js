const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({

    email:{
        type:String,
        required:true
    },
    // order_data: {
    //     type: Array,
    //     required: true,
    // },
    // address:{
    //     type : String,
    //     required: true,
    // },
    // phonenumber:{
    //     type : String, 
    //     required: true,
    // }
    order_data: [
        {
            order_date: String,
            items: [
                {
                    name: String,
                    qty: Number,
                    price: Number,
                }
            ],
            address: String,
            phonenumber: String,
            sessionid: String
        }
    ],


})

module.exports= mongoose.model('order',OrderSchema)