const produtoModel = require('../models/produtoModel');
const categoriaModel = require('../models/categoriaModel');

class ProdutoController {

  async salvar(req, res){
    const max = await produtoModel.findOne({}).sort({codigo: -1});
    const produto = req.body;
    produto.codigo = max == null ? 1 : max.codigo + 1;

    const categoria = await categoriaModel.findOne({codigo: produto.categoria.codigo});
    produto.categoria = categoria._id;

    const resultado = await produtoModel.create(produto);
    res.status(201).json(resultado);
  }

  async listar(req, res){
    const resultado = await produtoModel
         .find({});
         //.find({},{nome:1});
         //.find({},{nome:1}).limit(3);
         //.find({preco:{$gt:30}}, {nome:1, preco:1}).sort({preco:1});
         //.aggregate([{$project: {nome:1, ehVegetariano:1, flag:"aggregate"}}]);
    res.status(200).json(resultado);
  }

  async buscarPorCodigo(req, res){
    const codigo = req.params.codigo;
    const resultado = await produtoModel.findOne({'codigo': codigo}).populate('categoria');
    res.status(200).json(resultado);
  }

  async atualizar(req, res){
    const codigo = req.params.codigo;
    const _id = String((await produtoModel.findOne({'codigo': codigo}))._id);

    const produto = req.body;
    const categoria = await categoriaModel.findOne({codigo: produto.categoria.codigo});
    produto.categoria = categoria._id;

    await produtoModel.findByIdAndUpdate(String(_id), produto);
    res.status(200).send();
  }

  async excluir(req, res){
    const codigo = req.params.codigo;
    const _id = String((await produtoModel.findOne({'codigo': codigo}))._id);
    await produtoModel.findByIdAndRemove(String(_id));
    res.status(200).send();
  }
}

module.exports = new ProdutoController();