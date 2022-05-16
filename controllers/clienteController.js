const clienteModel = require('../models/clienteModel');
const usuarioModel = require('../models/usuarioModel');
const lojaModel = require('../models/lojaModel');
class ClienteController {

  async salvar(req, res){
    const cliente = req.body;
    const max = await clienteModel.findOne({}).sort({codigo: -1});
    cliente.codigo = max == null ? 1 : max.codigo + 1;

    const usuario = await usuarioModel.findOne({codigo: cliente.usuario.codigo});
    cliente.usuario = usuario._id;

    const loja = await lojaModel.findOne({codigo: cliente.loja.codigo});
    cliente.loja = loja._id;

    const resultado = await clienteModel.create(cliente);
    res.status(201).send();
  }

  async listar(req, res){
    const resultado = await clienteModel.find({});
    res.status(200).json(resultado);
  }

  async buscarPorCodigo(req, res){
    const codigo = req.params.codigo;
    const resultado = await clienteModel.findOne({'codigo': codigo})
          .populate('usuario').populate('loja');
    res.status(200).json(resultado);
  }

  async atualizar(req, res){
    const codigo = req.params.codigo;
    const _id = String((await clienteModel.findOne({'codigo': codigo}))._id);

    const cliente = req.body;
    const usuario = await usuarioModel.findOne({codigo: cliente.usuario.codigo});
    cliente.usuario = usuario._id;

    const loja = await lojaModel.findOne({codigo: cliente.loja.codigo});
    cliente.loja = loja._id;

    await clienteModel.findByIdAndUpdate(String(_id), cliente);
    res.status(200).send();
  }

  async excluir(req, res){
    const codigo = req.params.codigo;
    const _id = String((await clienteModel.findOne({'codigo': codigo}))._id);
    await clienteModel.findByIdAndRemove(String(_id));
    res.status(200).send();
  }
}

module.exports = new ClienteController();