const router = require('express').Router();
const authenticate = require('../authMiddleware.js');
const Carts = require('../models/userCarts.js');

router.post('/details', authenticate, async(req, res)=>{
    try{
        const userId = req.userId;
        const cart = await Carts.findOne({ userId });
        res.send(cart);
    }catch(err){
        console.log(err);
    }
})

router.post('/addItem', authenticate, async(req, res)=>{
    try{
        const userId = req.userId;
        const item = req.body.item;
        const userCart = await Carts.findOne({ userId });
        
        //if user adding item to cart first time
        if(!userCart){
            const newCart = new Carts({ userId, items: [item] });
            await newCart.save();
            return res.send('item saved successfully');
        }
        
        //check if item already added in cart or not
        const index = userCart.items.findIndex((obj)=> obj.itemId.toString() === item.itemId );
        if(index !== -1) return res.send('item already added in cart');

        userCart.items.push(item);
        await userCart.save();
        res.send('item added in cart');
    }catch(err){
        res.status(500).send(err);
    }
})

router.post('/removeItem', authenticate, async(req, res)=>{
    try{
        const userId = req.userId;
        const itemId = req.body.itemId; 

        const cart = await Carts.findOne({ userId });
        if(!cart) return res.status(404).send('cart not found');

        const newItems = cart.items.filter((obj)=> obj.itemId.toString() !== itemId)
        cart.items = newItems;

        await cart.save();
        res.send('item removed successfully');
    }catch(err){
        res.status(500).send(err);
    }
})
module.exports = router;