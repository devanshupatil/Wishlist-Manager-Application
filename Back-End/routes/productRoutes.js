const express = require('express');
const router = express.Router();
const {getProducts, createProduct, updateProduct, deleteProduct} = require('../controller/productController');
const { searchProduct } = require('../controller/productController');
const { sortByDate } = require('../controller/productController');
const { sortByPrice } = require('../controller/productController');


router.get('/products', getProducts);

router.post('/products', createProduct);

router.put('/products/:id', updateProduct);

router.delete('/products/:id', deleteProduct);

router.get('/products/search/:name', searchProduct);

router.get('/products/search/:name', sortByDate);

router.get('/products/search/:name', sortByPrice);






module.exports = router;