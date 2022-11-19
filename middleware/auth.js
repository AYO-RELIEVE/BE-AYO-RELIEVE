const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    let token;

    const headerAuthorization = req.headers.authorization;

    if (headerAuthorization && headerAuthorization.startsWith('Bearer')) {
        token = headerAuthorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN);

        req.user = payload.user;

        return next();
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            message: error.message
        });
    }
}