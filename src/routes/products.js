const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.list);
router.get('/search', productsController.search);
router.get('/create', productsController.create);

router.post('/agregar/:id', productsController.agregarCarrito);

module.exports = router;