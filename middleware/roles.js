module.exports = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.status)) return res.status(401).json({ message: 'Unauthorized' });
        next();
    };
}