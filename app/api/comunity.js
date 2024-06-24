const express = require('express');
const router = express.Router();
const { handleGetComunityById, handleCreateComunity, handleDeleteComunity, handleGetComunities, } = require('../controller/comunity');
const { authorize } = require('../middleware/auth');

router
    .get('/', authorize, handleGetComunities)
    .get('/:id', authorize, handleGetComunityById)
    .delete('/:id', authorize, handleDeleteComunity)
    .post('/', authorize, handleCreateComunity)

module.exports = router;