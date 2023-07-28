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
            'SELECT * FROM usuarios;',
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
                    usuarios: resultado.map(user => {
                        return {
                            id: user.id,
                            dcad: user.dcad,
                            nome: user.nome,
                            email: user.email,
                            senha: '*************',
                            fone: user.fone,
                            datanasc: user.datanasc,
                            request: {
                                tipo: 'GET',
                                descricao: 'Consulta todos os usuarios',
                                url: `http://localhost:${process.env.PORT}/login/${user.id}`
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
    /* const usuario = {
        nome: req.body.nome,
        email: req.body.email,
        fone: req.body.fone,
        dnasc: req.body.datanasc
    } */

    mysql.getConnection((error, conn) => {
        if (error) { 
            return res.status(500).send({
                error: error
            });         
        }
        conn.query(
            'INSERT INTO usuarios (nome, email, fone, datanasc) VALUES (?, ?, ?, ?);',
            [req.body.nome, req.body.email, req.body.fone, req.body.datanasc],
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Usuário inserido',
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
            'SELECT * FROM usuarios WHERE id = ?;',
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
            'UPDATE usuarios SET nome = ?, email = ?, fone = ?, datanasc = ? WHERE id = ?;',
            [req.body.nome, req.body.email, req.body.fone, req.body.datanasc, req.body.id],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(202).send({
                    message: "Usuário alterado", 
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
            'DELETE FROM usuarios WHERE id = ?;',
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
                    message: "Usuário apagado",
                    result: resultado
                }); 
            }
        )
    });
});

module.exports = router;