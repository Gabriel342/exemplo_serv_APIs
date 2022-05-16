const usuarioModel = require('../models/usuarioModel');
const auth = require('../auth/auth');
const bcryptjs = require('bcryptjs');

class UsuarioController {

  async salvar(req, res){
    const usuario = req.body;
    const max = await usuarioModel.findOne({}).sort({codigo: -1});
    usuario.codigo = max == null ? 1 : max.codigo + 1;
    
    if (await usuarioModel.findOne({'email': usuario.email})){
      res.status(400).send({error: 'Usuário já cadastrado!'});
    }

    const resultado = await usuarioModel.create(usuario);
    const token = auth.gerarToken(resultado);
    res.status(201).json({id: usuario._id, nome: resultado.nome, email: resultado.email, token: token});
  }

  async listar(req, res){
    const resultado = await usuarioModel.find({}).populate('perfil');
    res.status(200).json(resultado);
  }

  async buscarPorCodigo(req, res){
    const codigo = req.params.codigo;
    const resultado = await usuarioModel.findOne({'codigo': codigo}).populate('perfil');
    res.status(200).json(resultado);
  }

  async atualizar(req, res){
    const codigo = req.params.codigo;
    const _id = String((await usuarioModel.findOne({'codigo': codigo}))._id);
    const usuario = await auth.gerarHash(req.body);
    await usuarioModel.findByIdAndUpdate(String(_id), usuario);
    res.status(200).send();
  }

  async excluir(req, res){
    const codigo = req.params.codigo;
    const _id = String((await usuarioModel.findOne({'codigo': codigo}))._id);
    await usuarioModel.findByIdAndRemove(String(_id));
    res.status(200).send();
  }
}

module.exports = new UsuarioController();