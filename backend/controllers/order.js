const router = require('express').Router();
const authenticate = require('../authMiddleware.js');
const Products = require('../models/products.js');
const Orders = require('../models/orders.js');
const Carts = require('../models/userCarts.js');

router.post('/addOrder', authenticate, async(req, res)=>{
    try{
        const userId = req.userId;
        const { items, firstName, lastName, phoneNumber, address } = req.body;
        let validatedItems = [];
        let total = 0;

        for(let item of items){
            const product = await Products.findById({ _id: item.itemId });
            if(!product || product.stock < item.quantity) continue;

            product.stock -= item.quantity;
            total += item.price * item.quantity;
            await product.save();
            validatedItems.push(item);
        }
        if(validatedItems.length === 0) return res.status(404).send('no item is ordered');

        const order = new Orders({ items: validatedItems, userId, firstName, lastName, phoneNumber, total, address });
        const confirmOrder = await order.save();

        await Carts.findOneAndDelete({ userId });
        res.send(confirmOrder._id);
    }catch(err){
        return res.status(500).send(err); }
})

//get Orders of particular User
router.post('/getOrders', authenticate, async(req, res)=>{
    try{
        const userId = req.userId;
        const orders = await Orders.find({ userId }).sort({ createdAt: -1 });
        res.send(orders);
    }catch(err){
       res.status(500).send(err); }
})

module.exports = router;