const mongoose = require('mongoose');
const produtoSchema = require('./schemas/produtoSchema');
const usuarioSchema = require('./schemas/usuarioSchema');

const pedidoSchema = new mongoose.Schema({
  codigo: Number,
  data: {type: Date, default: Date.now},
  itens: [produtoSchema],
  total: Number,
  cliente: {type: mongoose.Schema.Types.ObjectId, ref: 'cliente'},
  status: {type: mongoose.Schema.Types.ObjectId, ref: 'status'}	
});

module.exports = mongoose.model('pedido', pedidoSchema);