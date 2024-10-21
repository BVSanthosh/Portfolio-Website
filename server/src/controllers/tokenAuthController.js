const jwt = require('jsonwebtoken');

//middleware for authenticating JWT tokens and is used for protected routes
exports.authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '').trim();

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access Denied'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.id;

        next();
    } catch(error) {
        console.error(`Error verifying token: ${error}`);
        res.status(403).json({
            success: false,
            message: 'Invalid Token'
        });
    }
}