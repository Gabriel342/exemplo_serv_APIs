const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  codigo: Number,
  nome: {type: String, required: [true, "Nome é obrigatório!"]},
  descricao: String,
  preco: {
    type: Number, 
    min: [0, "Preço não pode ser negativo!"], 
    required: [true, "Preço é obrigatório!"]
  },
  peso: Number,  
  foto: String,
  desconto: Number,
  pontosDasAvaliacoes: Number,
  totalDeAvaliacoes: Number, 
  disponibilidade: Number,
  totalDeCompras: Number,
  ehVegetariano: Boolean,
  categoria: {type: mongoose.Schema.Types.ObjectId, ref: 'categoria'},
  quantidade: Number
});

module.exports = produtoSchema;