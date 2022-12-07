const db = require('../database/models');
const Op = db.Sequelize.Op;

const productsController = {
    list: (req, res) => {
        db.Producto.findAll({
            include: [{association: 'categorias'}]
        })
        .then(resultado => {
            res.render('products', {title: 'listado de productos', productos: resultado})
        })
    },
    search: (req, res) => {
        let busqueda = req.query.busqueda;
        db.Producto.findAll({
            where: {
                nombre: {[Op.like]: '%' + busqueda + '%'}
            }
        })
        .then(resultado => {
            res.json(resultado)
        })
    },
    create: (req, res) => {
        db.Categoria.findAll()
            .then(categorias => {
                res.render('product-create-form', {categorias})
            });
    },
    store: (req, res) => {
        let datos = req.body;
        db.Producto.create({
            nombre: datos.nombre,
            precio: parseInt(datos.precio),
            cantidad: parseInt(datos.cantidad),
            id_persona: req.session.usuarioLogueado.id,
            id_categoria: datos.id_categoria
        })
            .then(() => {
                res.redirect('/products')
            })
            .catch(err => {
                res.send(err)
            })
    },
    agregarCarrito: (req, res) => {
        db.Producto.findByPk(req.params.id)
            .then(producto => {
                db.Carrito.create({
                    cantidad: req.body.cantidad,
                    id_persona: req.session.usuarioLogueado.id,
                    id_producto: req.params.id
                })
            })
            .then(() => {
                res.redirect('/products')
            })
    },
    verCarrito: (req, res) => {
        db.Carrito.findAll({
            include: [{association: 'producto'}],
            where: {
                id_persona: req.session.usuarioLogueado.id
            }
        })
            .then(productos => {
                res.render('carrito', {title: 'Carrito de Compras', productos})
            })
            .catch(err => {
                res.send(err)
            })
    },
    vaciarCarrito: (req, res) => {
        db.Carrito.destroy({
            where: {
                id_persona: req.session.usuarioLogueado.id
            }
        })
            .then(() => {
                res.redirect('/products/carrito')
            })
    }
};

module.exports = productsController;