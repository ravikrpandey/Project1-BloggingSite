
const jwt = require("jsonwebtoken");

const validateToken = function (req, res, next) {
    try {
        let token = req.headers["mytoken"];

        if (!token) return res.send({ status: false, msg: "token must be present" });

        let decodedToken = jwt.verify(token, "Rosan");

        if (!decodedToken) {
            
            return res.status(403).send({ status: false, msg: "token is invalid" });
        }

        next()
    }
    catch (err) {
        res.status(500).send(Error: err.msg)
    }
}

module.exports.validateToken = validateToken