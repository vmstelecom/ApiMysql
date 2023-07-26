const express = require('express');
const app = express();
const morgan = require('morgan');

const rotaLogin = require('./routes/login');
const rotaCarros = require('./routes/carros');

app.use(morgan('dev'));

app.use('/login', rotaLogin);
app.use('/carros', rotaCarros);
/* app.use('/', (req, res, next) => {
    res.status(200).send({
        message: 'Instruções de uso da API'
    });
}); */

app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada!');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;