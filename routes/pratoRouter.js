const express = require('express');
const router = express.Router();
const pratoController = require('../controllers/pratoController');

router.get('/', pratoController.carregar);
router.put('/:codigo', pratoController.atualizar);

module.exports = router;