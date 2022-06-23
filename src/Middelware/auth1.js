
const jwt = require('jsonwebtoken')
const secretKey = "Roshan"

const loginCheck = async function(req, res, next) {
    try {

        let token = req.headers['x-api-key'] || req.headers['X-api-key']
        if (!token) {
            return res.status(403).send({ status: false, message: `Missing authentication token in request` })
        }

        let decoded = jwt.verify(token, secretKey)

        if (!decoded) {
            return res.status(403).send({ status: false, message: `Invalid authentication token in request` })
        }

        req.authorId = decoded.authorId
        next()
    } catch (error) {
        res.status(500).send({ status: false, Error: "Provide Valid token"})
    }
}

module.exports.loginCheck=loginCheck;
