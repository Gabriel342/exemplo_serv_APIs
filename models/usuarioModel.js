const mongoose = require('mongoose');
const usuarioSchema = require('./schemas/usuarioSchema');
module.exports = mongoose.model('usuario', usuarioSchema);