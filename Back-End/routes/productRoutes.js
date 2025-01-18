const express = require('express');
const router = express.Router();
const {getProducts, updateProduct, deleteProduct} = require('../controller/productController');
const { searchProduct } = require('../controller/productController');
const { sortByDate } = require('../controller/productController');
const { sortByPrice } = require('../controller/productController');
const { filterByPriority } = require('../controller/productController');
const {createProduct} = require('../controller/productController');

const verifyToken  = require('../middleware/auth');

router.use(verifyToken);

router.get('/products', getProducts);

router.post('/products', createProduct);

router.put('/products/:id', updateProduct);

router.delete('/products/', deleteProduct);

router.get('/products/search/:name', searchProduct);

router.get('/products/search/:name', sortByDate);

router.get('/products/search/:name', sortByPrice);

router.get('/products/search/:name', filterByPriority);






module.exports = router;