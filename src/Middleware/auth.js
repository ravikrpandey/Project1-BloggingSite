
const jwt = require("jsonwebtoken");

const validateToken = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];

        if (!token) return res.send({ status: false, msg: "token must be present" });

        let decodedToken = jwt.verify(token, "Roshan");

        if (!decodedToken) {

            return res.status(403).send({ status: false, msg: "token is invalid" });
        }
        if (req.body.authorId) {
            let authorLoggedIn = req.body.authorId
            let authorToBeModified = decodedToken.authorId
            if (!authorLoggedIn == authorToBeModified) {
                return res.status(403).send({ status: false, msg: "You are not allowed to modify or publish" });
            }
        }
        if (req.query.authorId) {
            let authorLoggedIn = req.query.authorId
            let authorToBeModified = decodedToken.authorId
            if (!authorLoggedIn == authorToBeModified) {
                return res.status(403).send({ status: false, msg: "You are not allowed to modify or publish" });
            }
        }

        next()
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.validateToken = validateToken