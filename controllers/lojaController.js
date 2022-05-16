const lojaModel = require('../models/lojaModel');

class LojaController {

  async salvar(req, res){
    const max = await lojaModel.findOne({}).sort({codigo: -1});
    const loja = req.body;
    loja.codigo = max == null ? 1 : max.codigo + 1;
    const resultado = await lojaModel.create(loja);
    res.status(201).json(resultado);
  }

  async listar(req, res){
    const resultado = await lojaModel.find({});
    res.status(200).json(resultado);
  }

  async buscarPorCodigo(req, res){
    const codigo = req.params.codigo;
    const resultado = await lojaModel.findOne({'codigo': codigo});
    res.status(200).json(resultado);
  }

  async atualizar(req, res){
    const codigo = req.params.codigo;
    const _id = String((await lojaModel.findOne({'codigo': codigo}))._id);
    await lojaModel.findByIdAndUpdate(String(_id), req.body);
    res.status(200).send();
  }

  async excluir(req, res){
    const codigo = req.params.codigo;
    const _id = String((await lojaModel.findOne({'codigo': codigo}))._id);
    await lojaModel.findByIdAndRemove(String(_id));
    res.status(200).send();
  }
}

module.exports = new LojaController();