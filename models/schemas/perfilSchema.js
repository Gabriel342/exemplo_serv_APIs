const mongoose = require('mongoose');

const perfilSchema = new mongoose.Schema({
  codigo: Number,
  nome: String,
  papel: String
});

module.exports = perfilSchema;