const pratoModel = require('../models/pratoDoDiaModel');

class PratoController {

  async carregar(req, res){
    const prato = await pratoModel.findOne({'codigo': 1}).populate('produto');
    res.status(200).json(prato);
  }

  async atualizar(req, res){
    const codigo = req.params.codigo;
    const _id = String((await pratoModel.findOne({'codigo': codigo}))._id);
    await pratoModel.findOneAndUpdate(String(_id), req.body);
    res.status(200).send();
  }
}

module.exports = new PratoController();