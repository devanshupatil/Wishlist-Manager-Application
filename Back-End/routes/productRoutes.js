const express = require('express');
const router = express.Router();
const {getProducts, updateProduct, deleteProduct} = require('../controller/productController');
const {createProduct} = require('../controller/productController');
const {getProductById} = require('../controller/productController');

const verifyToken  = require('../middleware/auth');

router.use(verifyToken);

router.get('/products', getProducts);

router.post('/products', createProduct);

router.put('/products/:id', updateProduct);

router.delete('/products/:id', deleteProduct);

router.get('/products/:id', getProductById);










module.exports = router;