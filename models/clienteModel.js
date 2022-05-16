const mongoose = require('mongoose');
const clienteSchema = require('./schemas/clienteSchema');
module.exports = mongoose.model('cliente', clienteSchema);