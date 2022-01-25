const jwt = require('jsonwebtoken');

// hardcoded secret key, irl this should be in a config file
const secret = "s33eecr3t";

module.exports = {
    verify: function (req, res, next) {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];

            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    res.status(401).json({
                        error: "Failed to authenticate token",
                    });
                } else {
                    req.user = decoded;
                    next();
                }
            });
        } else {
            res.status(401).json({
                error: "No token provided",
            });
        }
    },
    isAdmin: function (req, res, next) {
        if (req.user.role === 'admin') {
            next();
        } else {
            res.status(401).json({
                error: "Unauthorized",
            });
        }
    },
}