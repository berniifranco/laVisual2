const db = require('../database/models');
const bcrypt = require('bcryptjs');
const { fileLoader } = require('ejs');

const usersController = {
    list: (req, res) => {
        db.Persona.findAll({
            include: [{association: 'rol'}]
        })
        .then(persona => {
            res.render('users', {title: 'Listado de usuarios', users: persona})
        })
    },
    register: (req, res) => {
        res.render('register');
    },
    store: (req, res) => {
        let datos = req.body;
        db.Persona.create({
            nombre: datos.nombre,
            email: datos.email,
            usuario: datos.usuario,
            contrasena: bcrypt.hashSync(datos.contrasena, 10),
            direccion: datos.direccion,
            piso: datos.piso,
            departamento: datos.departamento,
            ciudad: datos.ciudad,
            provincia: datos.provincia,
            pais: datos.pais,
            imagen: req.file.filename,
            id_empresa: 1,
            id_rol: 1
        })
        .then(function() {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err);
        })
    },
    login: (req, res) => {
        res.render('login')
    },
    procesoLogin: (req, res) => {
        let datos = req.body;
        db.Persona.findOne({
            where: {
                email: datos.email
            }
        })
        .then(persona => {
            if (bcrypt.compareSync(datos.pass, persona.contrasena)) {
                return req.session.usuarioLogueado = persona
            }
        })
        .then(logueado => {
            if (datos.recordame != undefined) {
                res.cookie('recordame', logueado.id, {maxAge: ((((1000 * 60) * 60) * 24) * 30)})
            }
            res.redirect('/')
        })
        .catch(error => {
            res.send('usuario no encontrado')
        })
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('recordame');
        res.redirect('/')
    },
    detail: (req, res) => {
        db.Persona.findByPk(req.params.id)
        .then(persona => {
            res.render('userDetail', {title: 'Perfil de usuario', usuario: persona})
        })
        .catch(err => {
            console.log(err);
        })
    },
    edit: (req, res) => {
        db.Persona.findByPk(req.params.id)
            .then(usuario => {
                res.render('form-edit-user', {usuario})
            })
            .catch(err => {
                console.log(err);
            })
    },
    update: (req, res) => {
        let datos = req.body;
        db.Persona.update({
            nombre: datos.nombre,
            email: datos.email,
            contrasena: bcrypt.hashSync(datos.pass, 10),
            direccion: datos.direccion,
            piso: datos.piso,
            departamento: datos.departamento,
            ciudad: datos.cuidad,
            provincia: datos.provincia,
            pais: datos.pais
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(personaEdit => {
                res.redirect('/')
            })
    }
};

module.exports = usersController;