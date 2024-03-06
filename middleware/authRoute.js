const jwt = require('jsonwebtoken');

const authRoute = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        const jwtVerify = jwt.verify(token, 'Secrets santa');
        if(jwtVerify) {
            next();
        } else {
            res.status(404).send("Login failure");
        } 
    } else {
        res.status(404).send("Login Failed");
    }
}
module.exports = authRoute;