const express = require('express');
const router = express.Router();
const mysql = require('../../database/mysql');

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'GET em login'
    });
});

router.post('/', (req, res, next) => {
    const usuario = {
        nome: req.body.nome,
        email: req.body.email,
        fone: req.body.fone,
        dnasc: req.body.datanasc
    }
    res.status(201).send({
        mensagem: 'Insere um usuario',
        usuarioCriado: usuario
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