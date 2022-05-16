const statusModel = require('../models/statusModel');

class StatusController {

  async salvar(req, res){
    const max = await statusModel.findOne({}).sort({codigo: -1});
    const status = req.body;
    status.codigo = max == null ? 1 : max.codigo + 1;
    const resultado = await statusModel.create(status);
    res.status(201).json(resultado);
  }

  async listar(req, res){
    const resultado = await statusModel.find({});
    res.status(200).json(resultado);
  }

  async buscarPorCodigo(req, res){
    const codigo = req.params.codigo;
    const resultado = await statusModel.findOne({'codigo': codigo});
    res.status(200).json(resultado);
  }

  async atualizar(req, res){
    const codigo = req.params.codigo;
    const _id = String((await statusModel.findOne({'codigo': codigo}))._id);
    await statusModel.findByIdAndUpdate(String(_id), req.body);
    res.status(200).send();
  }

  async excluir(req, res){
    const codigo = req.params.codigo;
    const _id = String((await statusModel.findOne({'codigo': codigo}))._id);
    await statusModel.findByIdAndRemove(String(_id));
    res.status(200).send();
  }
}

module.exports = new StatusController();