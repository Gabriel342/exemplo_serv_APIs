const mongoose = require('mongoose');
const perfilSchema = require('./schemas/perfilSchema');
module.exports = mongoose.model('perfil', perfilSchema);