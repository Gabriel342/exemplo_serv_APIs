require("./mongodb");
const mongoose = require("mongoose");

const perfilModel = require("../models/perfilModel");
const perfis = require("./perfis.json");

const lojaModel = require("../models/lojaModel");
const lojas = require("./lojas.json");

const statusModel = require("../models/statusModel");
const status = require("./status.json");

const pratoDoDiaModel = require("../models/pratoDoDiaModel");
const pratoDoDia = require("./pratoDoDia.json");

const categoriaModel = require("../models/categoriaModel");
const categorias = require("./categorias.json");

const usuarioModel = require("../models/usuarioModel");
const usuarios = require("./usuarios.json");

const clienteModel = require("../models/clienteModel");
const clientes = require("./clientes.json");

const produtoModel = require("../models/produtoModel");
const produtos = require("./produtos.json");

const pedidoModel = require("../models/pedidoModel");
const pedidos = require("./pedidos.json");

async function carregarDados() {
  try {

    await perfilModel.deleteMany({});
    for (const perfil of perfis) {
      await perfilModel.create(perfil);
    }
    console.log("Carga de perfis concluída!");

    await lojaModel.deleteMany({});
    for (const loja of lojas) {
      await lojaModel.create(loja);
    }
    console.log("Carga de lojas concluída!");

    await statusModel.deleteMany({});
    for (const objStatus of status) {
      await statusModel.create(objStatus);
    }
    console.log("Carga de status concluída!");

    await categoriaModel.deleteMany({});
    for (const categoria of categorias) {
      await categoriaModel.create(categoria);
    }
    console.log("Carga de categorias concluída!");

    await usuarioModel.deleteMany({});
    for (const usuario of usuarios) {
      await perfilModel
      .findOne({ codigo: usuario.perfil })
      .then((perfil) => {
        usuario.perfil = perfil._id;
        usuario.isCarga = true;
        return usuario;
      })
      .then(async (usuarioAlterado) => {
        await usuarioModel.create(usuarioAlterado);
      });
    }
    console.log("Carga de usuarios concluída!");

    await produtoModel.deleteMany({});
    for (const produto of produtos) {
      await categoriaModel
        .findOne({ codigo: produto.categoria })
        .then((categoria) => {
          produto.categoria = categoria._id;
          return produto;
        })
        .then(async (produtoAlterado) => {
          await produtoModel.create(produtoAlterado);
        });
    }
    console.log("Carga de produtos concluída!");

    await pratoDoDiaModel.deleteMany({});
    await produtoModel
      .findOne({ codigo: pratoDoDia.produto })
      .then((produto) => {
        pratoDoDia.produto = produto._id;
        return pratoDoDia;
      })
      .then(async (pratoAlterado) => {
        await pratoDoDiaModel.create(pratoAlterado);
      });
    console.log("Carga de prato do dia concluída!");

    await clienteModel.deleteMany({});
    for await (const cliente of clientes) {
      await lojaModel
        .findOne({ codigo: cliente.loja })
        .then((loja) => {
          cliente.loja = loja._id;
          return cliente;
        })
        .then(async (clienteLoja) => {
          await usuarioModel
            .findOne({ codigo: clienteLoja.usuario })
            .then((usuario) => {
              clienteLoja.codigo = usuario.codigo;
              clienteLoja.usuario = usuario._id;
              return clienteLoja;
            })
            .then(async (clienteUsuario) => {
              await clienteModel.create(clienteUsuario);
            });
        });
    }
    console.log("Carga de clientes concluída!");

    await pedidoModel.deleteMany({});
    for (const pedido of pedidos) {
      await statusModel.findOne({ codigo: pedido.status }).then((status) => {
        pedido.status = status._id;
      });

      await clienteModel.findOne({ codigo: pedido.cliente }).then((cliente) => {
        pedido.cliente = cliente._id;
      });

      for await (const [i] of pedido.itens.entries()) {
        await categoriaModel
          .findOne({ codigo: pedido.itens[i].categoria })
          .then(async (categoria) => {
            pedido.itens[i].categoria = categoria._id;
          });
      }
      await pedidoModel.create(pedido);
    }
    console.log("Carga de pedidos concluída!");
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
}

carregarDados();
