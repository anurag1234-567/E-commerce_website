const router = require('express').Router();
const Users = require('../models/users');
const authenticate = require('../authMiddleware');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//login
router.post('/login', async(req, res)=>{
    try{
        const user = await Users.findOne({ email: req.body.email });
        if(!user) return res.status(400).send('Invalid credentials');
        
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if(!passwordMatch) return res.status(400).send('Invalid credentials');

        const { _id, role } = user;
        const token = jwt.sign({ userId: _id, role }, 'secret-123', { expiresIn: '30d' });
        res.json({ token, role });
    }catch(err){
        console.log(err);
    }
})

//register
router.post('/register', async(req, res)=>{
    try{
        const exist = await Users.findOne({ email: req.body.email });
        if(exist){
            return res.status(409).send('This email is already in use!');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new Users({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
        })
        await user.save();
        res.send('user saved Successfully');
    }catch(err){
        res.status(500).send(err);
    }
})

//change Password
router.post('/changePassword', authenticate, async(req, res)=>{
    try{
        const userId = req.userId;
        const user = await Users.findById({ _id: userId });
        if(!user) return res.status(400).send('User no found!');

        const passwordMatch = await bcrypt.compare(req.body.oldPassword, user.password);
        if(!passwordMatch) return res.status(400).send('Wrong Password!');

        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
        user.password = hashedPassword;

        await user.save();
        res.send('Password updated successfully');
    }catch(err){
        res.status(500).send(err);
    }
})

//reset 
router.post('/resetPassword', async(req, res)=>{
    try{
        const user = await Users.findOne({ email: req.body.email });
        if(!user) return res.status(400).send('User with this email does not exist!');

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;

        await user.save();
        res.send('Password updated successfully')
    }catch(err){
        res.status(500).send(err);
    }
})

module.exports = router;