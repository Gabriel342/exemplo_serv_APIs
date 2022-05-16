const mongoose = require('mongoose');

const lojaSchema = new mongoose.Schema({
  codigo: Number,
  nome: String
});

module.exports = mongoose.model('loja', lojaSchema);