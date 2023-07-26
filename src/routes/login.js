const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'GET em login'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'POST em login'
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    res.status(200).send({
        mensagem: 'GET com id em login',
        id: id
    });
});

router.patch('/:id', (req, res, next) => {
    const id = req.params.id
    res.status(200).send({
        mensagem: 'PATCH(alterar) em login',
        id: id
    });
});

router.delete('/', (req, res, next) => {
    const id = req.params.id
    res.status(201).send({
        mensagem: 'DELETE em login ->' + id,
    });
});

module.exports = router;