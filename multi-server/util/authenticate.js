const jwt = require('jsonwebtoken');

const authenticateToken = (role) => {
    return (req, res, next) => {
        // const cookie = req.headers['cookie'];
       
        const { authorization} = req.headers;
        const token = authorization.split(' ')[1];
        if (token == null) return res.status(401).send('You are not authorised');

        jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            console.log(user)
            if (error) return res.sendStatus(403);
            if (user.role = role) {
                req.user = user;
                next();
            } else {
                return res.status(403).send('User is not: ' + role);
            }
        });
    }
}

module.exports.authenticateToken = authenticateToken;