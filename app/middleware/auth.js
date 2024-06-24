const Auth = require('../model/auth');

const authorize = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        console.log("tokennya ini nih",bearerToken);
        const [user] = await Auth.authorize(bearerToken)
        console.log(user);
        req.user = user
        next();
    } catch (err) {
        res.status(err.statusCode || 500).json({
            status: "FAIL",
            message: err.message,
        });
    }
}

module.exports = {authorize}