const mongoose = require('mongoose');

const pratoDoDiaSchema = new mongoose.Schema({
  codigo: Number,
  produto: {type: mongoose.Schema.Types.ObjectId, ref: 'produto'}	
});

module.exports = mongoose.model('pratoDoDia', pratoDoDiaSchema);