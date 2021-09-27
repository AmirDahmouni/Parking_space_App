const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    description: { type: String, required: true },
    start:{type:Date,required:true},
    end:{type:Date,required:true},
    total_price:{type:Number,required:true},
    parking:{
        ref:"Parking",
        type: mongoose.Schema.Types.ObjectId
    },
    car:{
        ref:"Car",
        type:mongoose.Schema.Types.ObjectId
    },
    user:{
        ref:"User",
        type:mongoose.Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('Booking', BookingSchema)