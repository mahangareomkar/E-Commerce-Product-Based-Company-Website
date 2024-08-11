const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const fetchuser = (req, res, next) => {
    const token = req.header('authtoken')

    if (!token) {
        res.status(401).json({ error: "Please authenticate using a valid token" })
    }

    try {
        const data = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).json({ error: "Please authenticate using a valid token", token, error })
    }
}

module.exports = fetchuser