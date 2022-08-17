function requireUser(req, res, next) {
    if (!req.user) {
        res.status(401);
        next({
            name: "MissingUserError",
            message: "You must be logged in to perform this action"
        });
    }

    next();
}

function requireAdmin(req, res, next) {
    if (!req.user.isAdmin) {
        res.status(401);
        next({
            name: "AuthorizationError",
            message: "You must be an Administrator to perform this action"
        });
    }
    next();
}


module.exports = {
    requireUser,
    requireAdmin
}