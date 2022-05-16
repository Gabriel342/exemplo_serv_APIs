const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

router.get('/', statusController.listar);
router.post('/', statusController.salvar);
router.get('/:codigo', statusController.buscarPorCodigo);
router.put('/:codigo', statusController.atualizar);
router.delete('/:codigo', statusController.excluir);

module.exports = router;