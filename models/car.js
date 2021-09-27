const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    registration_number:{ type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    owner: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    } 
})

module.exports = mongoose.model('Car', CarSchema)