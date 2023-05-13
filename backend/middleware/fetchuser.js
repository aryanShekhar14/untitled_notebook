//middleware is just a function
var jwt = require('jsonwebtoken');
const JWT_SECRET = "Aryanisagoodboy";

const fetchuser = (req, res, next) => {
    //Get user from jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Plz authenticate using valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next()//after function

    } catch (error) {
        res.status(401).send({ error: "Plz authenticate using valid token" })
    }

}
module.exports = fetchuser;