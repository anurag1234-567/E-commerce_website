const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// Models 
// const Users = require('./models/users');
// const Products = require('./models/products.js');
// const Orders = require('./models/orders.js');
// const Carts = require('./models/userCarts.js');

//Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Controllers
const userAuthController = require('./controllers/userAuth.js');
const adminController = require('./controllers/admin.js');
const cartController = require('./controllers/cart.js');
const orderController = require('./controllers/order.js');
const productController = require('./controllers/product.js');

//database connection
mongoose.connect("mongodb://127.0.0.1:27017/E-commerce")
.then(()=>{ console.log('connected with database')})
.catch( (err)=>{ console.log(err)})

// app.use('/user', userController);
app.use('/', userAuthController);
app.use('/admin', adminController);
app.use('/product', productController);
app.use('/cart', cartController);
app.use('/order', orderController);

app.get('/', (req, res)=>{
    res.send('hello user');
})

//reset password
// app.post('/resetPassword', async(req, res)=>{
//     try{
//         const user = await Users.findOne({ email: req.body.email });
//         if(!user) return res.status(400).send('User with this email does not exist!');

//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         user.password = hashedPassword;

//         await user.save();
//         res.send('Password updated successfully')
//     }catch(err){
//         res.status(500).send(err);
//     }
// })

// app.get('/products', async(req, res)=>{
//     try{
//         //first filter and sort data before pagination
//         const { category, sortBy } = req.query;
//         const filter = category ? { category } : {};
//         let sortOptions = {};
        
//         if(sortBy){
//             switch(sortBy){
//                 case 'lowPrice': sortOptions.price = 'asc'; break;
//                 case 'highPrice': sortOptions.price = 'desc'; break;
//                 case 'highRated': sortOptions.rating = 'desc'; break;
//                 default: break;
//             }
//         }

//         //implementing server side pagination
//         const page = parseInt(req.query.page) || 1;
//         const pageSize = 15;
//         const skip = (page - 1)*pageSize;
        
//         const totalProducts = await Products.find(filter);
//         const totalPages = Math.ceil(totalProducts.length/pageSize);

//         const products = await Products.find(filter).sort(sortOptions).skip(skip).limit(pageSize);
//         res.json({ products, totalPages});
//     }catch(err){
//         res.status(500).send(err);
//         console.log(err);
//     }
// })

// app.get('/product/:id', async(req, res)=>{
//     try{
//         const _id = req.params.id;
//         const product = await Products.findOne({ _id });

//         if(!product) return res.status(400).send('Not found');
//         res.json(product);
//     }catch(err){
//         res.status(500).send(err);
//     }
// })
 
// const authenticate = (req, res, next)=>{
//     try{
//         const token = req.body.token;
//         jwt.verify(token, 'secret-123', (err, decoded)=>{
//             if(err){
//                 //either token expires or invalid signature
//                 return res.status(500).send('Authorization failed');
//             }
//             req.userId = decoded.userId;
//             req.role = decoded.role;
//         })
//         next();
//     }catch(err){
//         res.status(500).send(err);
//     }
// }

// app.post('/addOrder', authenticate, async(req, res)=>{
//     try{
//         const userId = req.userId;
//            const { items, address } = req.body;
//         let validatedItems = [];
//         let total = 0;

//         for(let item of items){
//             const product = await Products.findById({ _id: item.itemId });

//             if(!product || product.stock < item.quantity) continue;

//             product.stock -= item.quantity;
//             total += item.price * item.quantity;
//             await product.save();
//             validatedItems.push(item);
//         }
//         if(validatedItems.length === 0) return res.status(404).send('no item is ordered');

//         const order = new Orders({ items: validatedItems, userId, total, address });
//         const confirmOrder = await order.save();

//         await Carts.findOneAndDelete({ userId });
//         res.send(confirmOrder._id);
//     }catch(err){
//         return res.status(500).send(err);
//     }
// })

// //get Orders of particular User
// app.post('/getOrders', authenticate, async(req, res)=>{
//     try{
//         const userId = req.userId;
//         const orders = await Orders.find({ userId }).sort({ createdAt: -1 });
//         res.send(orders);
//     }catch(err){
//        res.status(500).send(err);
//     }
// })

//admin routes 
// app.post('/admin/getOrders', authenticate, async(req, res)=>{
//     try{
//         const role = req.role;
//         if(role !== 'admin') return res.status(500).send('Not Authorized');
        
//         const page = req.body.page || 1;
//         const pageSize = 10;
//         const skip = (page - 1) * pageSize;

//         const totalOrders = await Orders.find();
//         const totalPages = Math.ceil(totalOrders.length / pageSize);

//         const orders = await Orders.find().sort({ createdAt: -1 }).skip(skip).limit(pageSize);
//         res.json({ orders, totalPages });
//     }catch(err){
//         return res.status(500).send(err);
//     }
// })

// app.post('/admin/addProduct', authenticate, async(req, res)=>{
//     try{
//         const role = req.role; 
//         if(role !== 'admin') return res.status(500).send('not Authorized');

//         const product = new Products(req.body);
//         await product.save();

//         res.send('Product is added successfully');
//     }catch(err){
//         return res.status(500).send(err);
//     }
// })

// app.post('/admin/editProduct', authenticate, async(req, res)=>{
//     try{
//         const role = req.role; 
//         if(role !== 'admin') return res.status(500).send('not Authorized');

//         const updatedProduct = req.body;
//         await Products.findByIdAndUpdate({ _id: updatedProduct._id }, updatedProduct, {new: true});
//         res.send('Product updated successfully');
//     }catch(err){
//         res.status(500).send(err);
//     }
// })

// app.post('/admin/changeStatus', authenticate, async(req, res)=>{
//     try{
//         const role = req.role; 
//         if(role !== 'admin') return res.status(500).send('not Authorized');
//         const { id, status } = req.body;

//         const order = await Orders.findOne({ _id: id });
//         order.status = status;
//         await order.save();

//         res.send('Order Status Changed Successfully')
//     }catch(err){
//         console.log(err);
//     }
// })

//cart functionality
// app.post('/cart/details', authenticate, async(req, res)=>{
//     try{
//         const userId = req.userId;
//         const cart = await Carts.findOne({ userId });
//         res.send(cart);
//     }catch(err){
//         console.log(err);
//     }
// })

// app.post('/cart/addItem', authenticate, async(req, res)=>{
//     try{
//         const userId = req.userId;
//         const item = req.body.item;
//         const userCart = await Carts.findOne({ userId });
        
//         //if user adding item to cart first time
//         if(!userCart){
//             const newCart = new Carts({ userId, items: [item] });
//             await newCart.save();
//             return res.send('item saved successfully');
//         }
        
//         //check if item already added in cart or not
//         const index = userCart.items.findIndex((obj)=> obj.itemId.toString() === item.itemId );
//         if(index !== -1) return res.send('item already added in cart');

//         userCart.items.push(item);
//         await userCart.save();
//         res.send('item added in cart');
//     }catch(err){
//         res.status(500).send(err);
//     }
// })

// app.post('/cart/removeItem', authenticate, async(req, res)=>{
//     try{
//         const userId = req.userId;
//         const itemId = req.body.itemId; 

//         const cart = await Carts.findOne({ userId });
//         if(!cart) return res.status(404).send('cart not found');

//         const newItems = cart.items.filter((obj)=> obj.itemId.toString() !== itemId)
//         cart.items = newItems;

//         await cart.save();
//         res.send('item removed successfully');
//     }catch(err){
//         res.status(500).send(err);
//     }
// })

app.listen(4000,()=>{
    console.log('server running');
})