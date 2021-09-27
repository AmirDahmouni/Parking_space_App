const mongoose = require('mongoose');

const ParkingSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true },
    images: [{ type: String, required: true }],
    capacity:{ type: Number, required: true },
    nb_places_avaible:{ type: Number, default:0 },
    cars:[{
        ref:"Car",
        type:mongoose.Schema.Types.ObjectId
    }],
    responsable: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    } 
})

module.exports = mongoose.model('Parking', ParkingSchema)