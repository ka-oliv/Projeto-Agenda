import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/style.css';
import Login from './modules/Login';
import Register from './modules/Register';
import Contato from './modules/Contato';

document.addEventListener("DOMContentLoaded", function (e) {
    const login = new Login('.form-login');
    const register = new Register('.form-register');
    const contato = new Contato('.form-contato');
    login.init();
    register.init();
    contato.init();
});


