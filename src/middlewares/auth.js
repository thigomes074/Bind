const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(401).end();

        req.id = decoded.id;
        next();
    });
}

module.exports = auth;