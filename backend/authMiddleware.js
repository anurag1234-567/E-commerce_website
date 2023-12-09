const jwt = require('jsonwebtoken');

const authenticate = (req, res, next)=>{
    try{
        const token = req.body.token;
        jwt.verify(token, 'secret-123', (err, decoded)=>{
            if(err){
                //either token expires or invalid signature
                return res.status(500).send('Authorization failed');
            }
            req.userId = decoded.userId;
            req.role = decoded.role;
        })
        next();
    }catch(err){
        res.status(500).send(err); }
}
module.exports = authenticate;