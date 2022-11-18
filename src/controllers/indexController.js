const db = require('../database/models')

const indexController = {
    index: (req, res) => {
        db.Persona.findAll()
        .then(persona => {
            res.render('index', {title: 'La Visual', persona})
        })
    }
};

module.exports = indexController;