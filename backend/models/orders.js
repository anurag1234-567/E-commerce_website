const mongoose = require('mongoose');
 
const itemSchema = mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products'},
    title: { type: String, required: true },
    brand: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    imageURL: { type: String, required: true }
})

const addressSchema = mongoose.Schema({
    streetAddress: { type: String },
    city: { type: String, default: 'pending' },
    state: { type: String, default: 'pending' },
    zipcode: { type: Number },
}) 

const schema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    firstName: { type: String, required: true },
    lastName: { type: String },
    phoneNumber: { type: String, required: true },
    items: { type: [itemSchema], required: true },
    total: { type: String, required: true },
    status: { type: String, default: 'pending' },
    address: { type: addressSchema, required: true },
    createdAt: { type: Date, default: Date.now }
})

const Orders = mongoose.model('Orders', schema);
module.exports = Orders;