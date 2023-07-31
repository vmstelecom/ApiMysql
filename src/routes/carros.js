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
                const response = {
                    registros: resultado.lenght,
                    carros: resultado.map(carro => {
                        return {
                            id: carro.id,
                            dcad: carro.dcad,
                            modelo: carro.modelo,
                            marca: carro.marca,
                            placa: carro.placa,
                            km: carro.km,
                            data: carro.data,
                            valor_litro: carro.valor_litro,
                            valor_total: carro.valor_total,
                            litros: carro.litros,
                            consumo: carro.consumo,
                            request: {
                                tipo: 'GET',
                                descricao: 'Consulta todos os dados do carro',
                                url: `http://localhost:${process.env.PORT}/carros/${carro.id}`
                            }
                        }
                    })
                }
                return res.status(200).send(response); 
            }
        )
    });
});

router.post('/', (req, res, next) => {
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
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                const response  = {
                    mensagem: 'Usuário inserido',
                    resquest: {
                        tipo: 'POST',
                        descricao: 'Insere um dado novo',
                        url: `http://localhost:${process.env.PORT}/carros/`
                    }
                }
                return res.status(201).send(response);
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
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                const response = {
                    carros: result.map(carro => {
                        return {
                            dcad: carro.dcad,
                            modelo: carro.modelo,
                            marca: carro.marca,
                            placa: carro.placa,
                            km: carro.km,
                            data: carro.data,
                            valor_litro: carro.valor_litro,
                            valor_total: carro.valor_total,
                            litros: carro.litros,
                            consumo: carro.consumo,
                            request: {
                                tipo: 'GET',
                                descricao: 'Consulta dado dados do carro',
                                url: `http://localhost:${process.env.PORT}/carros/${carro.id}`
                            }
                        }
                    })
                }
                return res.status(200).send(response);
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
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                const response  = {
                    mensagem: 'Dados alterados',
                    resquest: {
                        tipo: 'PATCH',
                        descricao: 'Altera um dado do carro',
                        url: `http://localhost:${process.env.PORT}/carros/${req.body.id}`
                    }
                }
                return res.status(201).send(response); 
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
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                const response  = {
                    mensagem: 'Dados Apagados',
                    resquest: {
                        tipo: 'PATCH',
                        descricao: 'Altera um dado do carro',
                        url: `http://localhost:${process.env.PORT}/carros/${req.body.id}`
                    }
                }
                return res.status(201).send(response); 
            }
        )
    });
});

module.exports = router;