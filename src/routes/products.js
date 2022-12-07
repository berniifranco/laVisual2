const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.list);
router.get('/search', productsController.search);
router.get('/create', productsController.create);

router.post('/add/:id', productsController.agregarCarrito);
router.get('/carrito', productsController.verCarrito);
router.delete('/vaciar', productsController.vaciarCarrito);

module.exports = router;