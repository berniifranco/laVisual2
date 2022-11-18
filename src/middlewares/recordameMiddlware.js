const db = require('../database/models')

function recordameMiddleware (req, res, next) {
    if (req.cookies.recordame != undefined && req.session.usuarioLogueado == undefined) {
        db.Persona.findOne({
            where: {
                id: req.cookies.recordame
            }
        })
        .then(resultado => {
            return req.session.usuarioLogueado = resultado
        })
        .then(usuarioLogueado => {
            return res.locals.usuarioLogueado = usuarioLogueado
        })
        .catch(err => {
            console.log(err);
        })
    };

    next();
};

module.exports = recordameMiddleware;