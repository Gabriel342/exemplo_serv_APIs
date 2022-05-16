const pedidoModel = require('../models/pedidoModel');
const statusModel = require('../models/statusModel');
class PedidoController {

  async salvar(req, res){
    const max = await pedidoModel.findOne({}).sort({codigo: -1});
    const pedido = req.body;
    pedido.codigo = max == null ? 1 : max.codigo + 1;

    const status = await statusModel.findOne({codigo: pedido.status.codigo});
    pedido.status = status;

    const resultado = await pedidoModel.create(pedido);
    res.status(201).json(resultado);
  }

  async listar(req, res){
    const resultado = await pedidoModel.find({'usuarioId': req.params.usuarioId});
    res.status(200).json(resultado);
  }

  async buscarPorCodigo(req, res){
    const { usuarioId, codigo } = req.params;
    const resultado = await pedidoModel.findOne({'codigo': codigo, 'usuarioId' : usuarioId});
    res.status(200).json(resultado);
  }

  async atualizar(req, res){
    const codigo = req.params.codigo;
    const _id = String((await pedidoModel.findOne({'codigo': codigo}))._id);
    await pedidoModel.findByIdAndUpdate(String(_id), req.body);
    res.status(200).send();
  }

  async excluir(req, res){
    const codigo = req.params.codigo;
    const _id = String((await pedidoModel.findOne({'codigo': codigo}))._id);
    await pedidoModel.findByIdAndRemove(String(_id));
    res.status(200).send();
  }
}

module.exports = new PedidoController();