const express = require('express');
const perfilController = require('../controllers/perfilController');
const router = express.Router();

router.get('/', perfilController.listar);
router.post('/', perfilController.salvar);
router.get('/:codigo', perfilController.buscarPorCodigo);
router.put('/:codigo', perfilController.atualizar);
router.delete('/:codigo', perfilController.excluir);

module.exports = router;