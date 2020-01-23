const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //Verify if token is valid
    const token = req.header('x-auth');
    if(!token)return res.status(401).send('Acces denied');
    try{
         jwt.verify(token, process.env.TOKEN_SECRET,  function(err, decodedToken) {
            if(err) { /* handle token err */ }
            else {
                req.userId = decodedToken.id;
            }});
        next();
    }catch(err){
        res.status(400).send('Invalid token')
    }
};

