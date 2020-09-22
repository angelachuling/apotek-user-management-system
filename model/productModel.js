const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    id: String,
    proName: String,
    quantity: Number,
    description: String,
    retailPrice: Number,
    purchasePrice: Number,
    percentage_discount: Number,
    src: String   
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product ;