const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  codigo: Number,
  nome: {
    type: String,
    require: true
  },
  sobrenome: String, 
  cpf: String,
  saldoCarteira: Number,
  receita: Number,
  empresa: String, 
  fone: String,
  endereco: String,
  cep: String,
  cidade: String,
  estado: String,
  usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'usuario'},
  loja: {type: mongoose.Schema.Types.ObjectId, ref: 'loja'}
});

module.exports = clienteSchema;