const express = require('express');
const router = express.Router();
const mysql = require('../../database/mysql').pool;

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { 
            return res.status(500).send({
                error: error
            });         
        }
        conn.query(
            'SELECT * FROM carros;',
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(200).send({ response: resultado}); 
            }
        )
    });
});

router.post('/', (req, res, next) => {
        /* const carro = {
        modelo: req.body.modelo,
        marca: req.body.marca,
        placa: req.body.placa,
        km: req.body.km,
        data: req.body.data,
        valor_litro: req.body.valor_litro,
        valor_total: req.body.valor_total,
        litros: req.body.litros,
        consumo: req.body.consumo
    }; */

    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO carros (modelo, marca, placa, km, data, valor_litro, valor_total, litros, consumo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                req.body.modelo,
                req.body.marca,
                req.body.placa,
                req.body.km,
                req.body.data,
                req.body.valor_litro,
                req.body.valor_total,
                req.body.litros,
                req.body.consumo
            ],
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Carro inserido',
                    id: resultado.insertId
                });
            }
        )
    });
});

router.get('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { 
            return res.status(500).send({
                error: error
            });         
        }
        conn.query(
            'SELECT * FROM carros WHERE id = ?;',
            [req.params.id],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(200).send({ response: resultado}); 
            }
        )
    });
});

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { 
            return res.status(500).send({
                error: error
            });         
        }
        conn.query(
            'UPDATE carros SET modelo = ?, marca = ?, placa = ?, km = ?, data = ?, valor_litro = ?, valor_total = ?, litros = ?, consumo = ? WHERE id = ?;',
            [
                req.body.modelo,
                req.body.marca,
                req.body.placa,
                req.body.km,
                req.body.data,
                req.body.valor_litro,
                req.body.valor_total,
                req.body.litros,
                req.body.consumo,
                req.body.id
            ],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(202).send({
                    message: "Carro alterado", 
                    result: resultado
                });
            }
        )
    });
});

router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { 
            return res.status(500).send({
                error: error
            });         
        }
        conn.query(
            'DELETE FROM carros WHERE id = ?;',
            [req.body.id],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(202).send({
                    message: "Carro apagado", 
                    result: resultado
                });
            }
        )
    });
});

module.exports = router;