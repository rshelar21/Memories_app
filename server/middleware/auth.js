// const {jwt, decode} = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const {decode} = require('jsonwebtoken');

// next() is a function that we call when we are done with the middleware
const auth = async(req, res, next) => {
    try {
        //req.headers.authorization is the token that we get from the client side and we split it into two parts and take the second part which is the token itself and we store it in a variable called token 
        // authorization is the name of the header that we set in the client side and we set it to Bearer ${token} so we split it into two parts and take the second part which is the token itself and we store it in a variable called token 
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500; // our token is less than 500 characters
        let decodeData;

        if(token && isCustomAuth) {
            decodeData = jwt.verify(token, "test")
            req.userId = decodeData?.id;
        }
        else {
            decodeData = jwt.decode(token);
            req.userId = decodeData?.sub;
        }
        // req.userId have the id of the user that is logged in and we can use it in the controllers to get the user data from the database and use it in the controllers   

        next()


    } catch (error) {
     console.log(error);   
    }
}


module.exports = auth;