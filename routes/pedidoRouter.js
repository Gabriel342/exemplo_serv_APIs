const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const auth = require('../auth/auth');

router.use(auth.autorizar);

router.post('/', pedidoController.salvar);
router.get('/:usuarioId', pedidoController.listar);
router.get('/:usuarioId/:codigo', pedidoController.buscarPorCodigo);
router.put('/:codigo', pedidoController.atualizar);
router.delete('/:codigo', pedidoController.excluir);

module.exports = router;