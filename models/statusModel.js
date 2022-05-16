const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  codigo: Number,
  nome: String
});

module.exports = mongoose.model('status', statusSchema);