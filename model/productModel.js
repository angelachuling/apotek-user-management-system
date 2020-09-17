const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    id: String,
    proName: String,
    title: String,
    quantity: Number,
    description: String,
    retailPrice: Number,
    purchasePrice: Number,
    percentage_discount: Number,
    src: String   
});
const product = mongoose.model('Product', productSchema);

module.exports = product ;