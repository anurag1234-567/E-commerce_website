const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: Array, required: true },
    price: { type:Number, required: true },
    rating: { type: Number },
    stock: { type: String, required: true },
})
 
const Products = mongoose.model('products', schema);
module.exports = Products;