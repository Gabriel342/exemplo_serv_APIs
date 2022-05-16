const perfilModel = require('../models/perfilModel');

class PerfilController {

  async salvar(req, res){
    const max = await perfilModel.findOne({}).sort({codigo: -1});
    const perfil = req.body;
    perfil.codigo = max == null ? 1 : max.codigo + 1;
    const resultado = await perfilModel.create(perfil);
    res.status(201).json(resultado);
  }

  async listar(req, res){
    const resultado = await perfilModel.find({});
    res.status(200).json(resultado);
  }

  async buscarPorCodigo(req, res){
    const codigo = req.params.codigo;
    const resultado = await perfilModel.findOne({'codigo': codigo});
    res.status(200).json(resultado);
  }

  async atualizar(req, res){
    const codigo = req.params.codigo;
    const _id = String((await perfilModel.findOne({'codigo': codigo}))._id);
    await perfilModel.findByIdAndUpdate(String(_id), req.body);
    res.status(200).send();
  }

  async excluir(req, res){
    const codigo = req.params.codigo;
    const _id = String((await perfilModel.findOne({'codigo': codigo}))._id);
    await perfilModel.findByIdAndRemove(String(_id));
    res.status(200).send();
  }
}

module.exports = new PerfilController();