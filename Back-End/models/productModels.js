// models/userModel.js
const supabase = require('../config/db')

const Product = supabase.from('products')


module.exports = Product;