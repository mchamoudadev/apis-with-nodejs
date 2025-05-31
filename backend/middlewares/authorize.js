export const authorize = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                message: `Access denied : Requires on of [${roles.join(',')}]`
            })
        }
        next();
    }
}