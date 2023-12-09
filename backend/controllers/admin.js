const router = require('express').Router();
const authenticate = require('../authMiddleware');
const Orders = require('../models/orders');
const Products = require('../models/products');

router.post('/getOrders', authenticate, async(req, res)=>{
    try{
        const role = req.role;
        if(role !== 'admin') return res.status(500).send('Not Authorized');
        
        const page = req.body.page || 1;
        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        const totalOrders = await Orders.find();
        const totalPages = Math.ceil(totalOrders.length / pageSize);

        const orders = await Orders.find().sort({ createdAt: -1 }).skip(skip).limit(pageSize);
        res.json({ orders, totalPages });
    }catch(err){
        return res.status(500).send(err);
    }
})
 
router.post('/addProduct', authenticate, async(req, res)=>{
    try{
        const role = req.role; 
        if(role !== 'admin') return res.status(500).send('not Authorized');

        const product = new Products(req.body);
        await product.save();

        res.send('Product is added successfully');
    }catch(err){
        return res.status(500).send(err);
    }
})

router.post('/editProduct', authenticate, async(req, res)=>{
    try{
        const role = req.role; 
        if(role !== 'admin') return res.status(500).send('not Authorized');

        const updatedProduct = req.body;
        await Products.findByIdAndUpdate({ _id: updatedProduct._id }, updatedProduct, {new: true});
        res.send('Product updated successfully');
    }catch(err){
        res.status(500).send(err);
    }
})

router.post('/changeStatus', authenticate, async(req, res)=>{
    try{
        const role = req.role; 
        if(role !== 'admin') return res.status(500).send('not Authorized');
        const { id, status } = req.body;

        const order = await Orders.findOne({ _id: id });
        order.status = status;
        await order.save();

        res.send('Order Status Changed Successfully')
    }catch(err){
        console.log(err);
    }
})
module.exports = router;