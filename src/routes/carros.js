const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'GET em carros'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'POST em carros'
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    res.status(200).send({
        mensagem: 'GET com id em carros',
        id: id
    });
});

router.patch('/:id', (req, res, next) => {
    const id = req.params.id
    res.status(200).send({
        mensagem: 'PATCH(alterar) em carros',
        id: id
    });
});

router.delete('/', (req, res, next) => {
    const id = req.params.id
    res.status(201).send({
        mensagem: 'DELETE em carros ->' + id,
    });
});

module.exports = router;