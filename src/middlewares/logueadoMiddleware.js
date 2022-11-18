function usuarioLogueado (req, res, next) {
    if (req.session.usuarioLogueado) {
        res.locals.usuarioLogueado = req.session.usuarioLogueado
    };

    next();
};

module.exports = usuarioLogueado;