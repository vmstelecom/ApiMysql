const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaLogin = require('./routes/login');
const rotaCarros = require('./routes/carros');
const rotaUsuarios = require('./routes/usuarios');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header(
        'Acces-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
});

app.use('/login', rotaLogin);
app.use('/carros', rotaCarros);
app.use('/usuarios', rotaUsuarios);
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