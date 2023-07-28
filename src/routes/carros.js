const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'GET em carros'
    });
});

router.post('/', (req, res, next) => {
        const carro = {
        modelo: req.body.modelo,
        marca: req.body.marca,
        placa: req.body.placa,
        km: req.body.km,
        data: req.body.data,
        valor_litro: req.body.valor_litro,
        valor_total: req.body.valor_total,
        litros: req.body.litros,
        consumo: req.body.consumo
    };

    res.status(201).send({
        mensagem: 'Insere um carros',
        carroCriado: carro
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