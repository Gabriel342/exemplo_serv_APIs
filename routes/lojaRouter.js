const express = require('express');
const lojaController = require('../controllers/lojaController');
const router = express.Router();

router.get('/', lojaController.listar);
router.post('/', lojaController.salvar);
router.get('/:codigo', lojaController.buscarPorCodigo);
router.put('/:codigo', lojaController.atualizar);
router.delete('/:codigo', lojaController.excluir);

module.exports = router;