const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

const { loginRequired } = require('./src/middleware/middleware');

// rotas da home
route.get('/', loginRequired, homeController.index);

// rotas de login
route.get('/login/index', loginController.indexLogin);
route.post('/login/loggon', loginController.loggon);
route.get('/login/logout', loginController.logout);
route.get('/register/index', loginController.indexRegister);
route.post('/register/registerOn', loginController.createAccount);

// rotas de contato
route.get('/contato/index', loginRequired, contatoController.index);
route.post('/contato/register', loginRequired, contatoController.register);
route.get('/contato/index/:id', loginRequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);
route.get('/contato/delete/:id', loginRequired, contatoController.delete);



module.exports = route;
