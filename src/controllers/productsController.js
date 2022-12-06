const db = require('../database/models');
const Op = db.Sequelize.Op;

const productsController = {
    list: (req, res) => {
        db.Producto.findAll({
            include: [{association: 'categorias'}, {association: 'persona'}]
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
            res.redirect('/products')
    },
    agregarCarrito: (req, res) => {
        db.Producto.findByPk(req.params.id)
            .then(producto => {
                db.Carrito.create({
                    cantidad: 1,
                    id_persona: req.session.usuarioLogueado.id,
                    id_producto: req.params.id
                })
            })
    }
};

module.exports = productsController;