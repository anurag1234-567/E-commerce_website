const mongoose = require('mongoose');
  
const itemSchema = new mongoose.Schema({ 
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true},
    title: { type: String, required: true },
    brand: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    imageURL: { type: String, required: true }
});

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [itemSchema]
})

const Carts = mongoose.model('Carts', cartSchema);
module.exports = Carts;