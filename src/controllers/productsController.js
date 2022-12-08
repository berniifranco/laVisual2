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
    eliminarUnItem: (req, res) => {
        db.Carrito.destroy({
            where: {
                id: req.params.id,
                id_persona: req.session.usuarioLogueado.id
            }
        })
            .then(() => {
                res.redirect('/products/carrito')
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
    },
    comprar: (req, res) => {
        db.Carrito.findAll({
            where: {
                id_persona: req.session.usuarioLogueado.id
            }
        })
            .then(productosCarrito => {
                for (const o of productosCarrito) {
                    db.Producto.findByPk(o.id_producto)
                        .then(producto => {
                            let nuevaCantidad = producto.cantidad - o.cantidad;
                            let idProducto = producto.id;
                            db.Producto.update({
                                cantidad: nuevaCantidad
                            }, {
                                where: {
                                    id: idProducto
                                }
                            })
                        })
                        .catch(err => {
                            res.send(err)
                        })
                }
            })
            .then(() => {
                db.Carrito.destroy({
                    where: {
                        id_persona: req.session.usuarioLogueado.id
                    }
                })
            })
            .then(() => {
                setTimeout(() => {                    
                    res.redirect('/products')
                }, 1000);
            })
            .catch(err => {
                res.send(err)
            })
    }
};

module.exports = productsController;