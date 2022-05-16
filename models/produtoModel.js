const mongoose = require('mongoose');
const produtoSchema = require('./schemas/produtoSchema');
module.exports = mongoose.model('produto', produtoSchema);