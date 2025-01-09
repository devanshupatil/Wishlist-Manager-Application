const {Schema, model} = require('mongoose');


const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    productUrl: {
        type: String,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    targetPrice: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    createAt:{
        type: Date,
        default: Date.now
    }
});

const productModel = model('Product', productSchema);

module.exports = productModel;
