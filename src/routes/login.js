const express = require('express');
const router = express.Router();
const mysql = require('../../database/mysql').pool;
const multer = require('multer');

let atual = Date.now();
let datual = new Date(atual);
let hora = datual.getHours();
let min = datual.getMinutes();
let subArq = hora + '_' + min + '_';


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, subArq + file.originalname);
    }
});

const arqFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5},
    fileFilter: arqFilter
});

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { 
            return res.status(500).send({
                error: error
            });         
        }
        conn.query(
            'SELECT * FROM usuarios;',
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                const response = {
                    registros: result.lenght,
                    usuarios: result.map(user => {
                        return {
                            id: user.id,
                            dcad: user.dcad,
                            nome: user.nome,
                            email: user.email,
                            senha: '*************',
                            fone: user.fone,
                            datanasc: user.datanasc,
                            foto: user.foto,
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

router.post('/', upload.single('foto'),(req, res, next) => {
    //console.log('exemplo' + nomeArq);
    mysql.getConnection((error, conn) => {
        if (error) { 
            return res.status(500).send({
                error: error
            });         
        }
        conn.query(
            'INSERT INTO usuarios (nome, email, senha, fone, datanasc, foto) VALUES (?, ?, ?, ?, ?, ?);',
            [req.body.nome, req.body.email, req.body.senha, req.body.fone, req.body.datanasc, req.file.path],
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
                        descricao: 'Insere um novo usuario',
                        url: `http://localhost:${process.env.PORT}/login/`
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
            'SELECT * FROM usuarios WHERE id = ?;',
            [req.params.id],
            (error, result, field) => {
                conn.release();
                  if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Usuário não encontrado'
                    });
                }

                const response = {
                    usuario: result.map(user => {
                        return {
                            id: user.id,
                            dcad: user.dcad,
                            nome: user.nome,
                            email: user.email,
                            senha: '*********',
                            fone: user.fone,
                            datanasc: user.datanasc,
                            foto: user.foto,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna um usuario',
                                url: `http://localhost:${process.env.PORT}/login/`
                            }
                        }
                    })
                }
                
                return res.status(201).send(response); 
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
            'UPDATE usuarios SET nome = ?, email = ?, fone = ?, datanasc = ? , foto = ? WHERE id = ?;',
            [req.body.nome, req.body.email, req.body.fone, req.body.datanasc, req.file.path, req.body.id],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                const response  = {
                    mensagem: 'Usuário alterado',
                    resquest: {
                        tipo: 'PATCH',
                        descricao: 'Altera um usuario',
                        url: `http://localhost:${process.env.PORT}/login/${req.body.id}`
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

                const response  = {
                    mensagem: 'Usuário apagado',
                    resquest: {
                        tipo: 'DELETE',
                        descricao: 'Apaga um usuario',
                        url: `http://localhost:${process.env.PORT}/login`
                    }
                }
                return res.status(201).send(response);
            }
        )
    });
});

module.exports = router;