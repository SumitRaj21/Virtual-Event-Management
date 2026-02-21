const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');

const auth = async (req, res, next) => {
    const authHeader = req?.headers?.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return next(new ApiError(401, 'Unauthorized'));
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return next(new ApiError(401, 'Invalid token'));
    }
}

module.exports = auth;