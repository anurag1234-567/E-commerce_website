const router = require('express').Router();
const Products = require('../models/products');

router.get('/', async(req, res)=>{
    try{
        //first filter and sort data before pagination
        const { category, sortBy } = req.query;
        const filter = category ? { category } : {};
        let sortOptions = {};
        
        if(sortBy){
            switch(sortBy){
                case 'lowPrice': sortOptions.price = 'asc'; break;
                case 'highPrice': sortOptions.price = 'desc'; break;
                case 'highRated': sortOptions.rating = 'desc'; break;
                default: break;
            }
        }

        //implementing server side pagination
        const page = parseInt(req.query.page) || 1;
        const pageSize = 15;
        const skip = (page - 1)*pageSize;
        
        const totalProducts = await Products.find(filter);
        const totalPages = Math.ceil(totalProducts.length/pageSize);

        const products = await Products.find(filter).sort(sortOptions).skip(skip).limit(pageSize);
        res.json({ products, totalPages});
    }catch(err){
        res.status(500).send(err);
        console.log(err);  }
})

router.get('/:id', async(req, res)=>{
    try{
        const _id = req.params.id;
        const product = await Products.findOne({ _id });

        if(!product) return res.status(400).send('Not found');
        res.json(product);
    }catch(err){
        res.status(500).send(err); }
})
module.exports = router;