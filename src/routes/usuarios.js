const express = require('express');
const router = express.Router();
const mysql = require('../../database/mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})};

        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
            if(errBcrypt) { return res.status(501).send({ error: errBcrypt}) }
            conn.query(
                `INSERT INTO usuarios (nome, email, senha, fone, datanasc) VALUES (?, ?, ?, ?, ?);`,
                [req.body.nome, req.body.email, hash, req.body.fone, req.body.datanasc],
                (error, results) => {
                    conn.release();
                    if(error) { return res.status(500).send({ error: error})};
                    const response  = {
                        mensagem: 'Usuário inserido',
                        resquest: {
                            id: results.insertId,
                            tipo: 'POST',
                            descricao: 'Insere um novo usuario',
                            url: `http://localhost:${process.env.PORT}/login/`
                        }
                    }
                    return res.status(201).send(response);
                });
        });
    });
});

router.post('/login', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})};

        const query = `SELECT * FROM usuarios WHERE email = ?;`;
        conn.query(query,[req.body.email], (error, results, fields) => {
            conn.release();
            if(error) { return res.status(500).send({ error: error})};
            if (results.length < 1) {
                return res.status(401).send({ mensagem: 'Falha na autenticação'});
            }
            bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                if (err) {
                    return res.status(401).send({ mensagem: 'Falha na autenticação'});
                }
                if (result) {
                    const token = jwt.sign({
                       id: results[0].id,
                       email: results[0].email
                    }, process.env.JWT_KEY, {
                        expiresIn: "1h"
                    });
                    return res.status(200).send({ 
                        mensagem: 'Autenticado',
                        token: token
                    });

                }
                return res.status(401).send({ mensagem: 'Falha na autenticação'});
            });
        });
    });
});

module.exports = router;