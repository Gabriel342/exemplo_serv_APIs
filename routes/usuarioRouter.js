const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.listar);
router.post('/', usuarioController.salvar);
router.get('/:codigo', usuarioController.buscarPorCodigo);
router.put('/:codigo', usuarioController.atualizar);
router.delete('/:codigo', usuarioController.excluir);

module.exports = router;