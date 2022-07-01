const Login = require('../models/LoginModel');


exports.indexLogin = (req, res) => {
    if(req.session.user) return res.render('index');
    return res.render('login');
};

exports.indexRegister = (req, res) => {
    res.render('register');
};

exports.createAccount = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.register();
    
        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('/register/index');
            });
            return;
        }
        req.flash('success', 'Usuário cadastrado com sucesso.');
        req.session.save(() => {
            return res.redirect('/login/index');
        });
    
    } catch(e) {
        console.log(e);
        return res.render('404');
    }

};

exports.loggon = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.loggon();
    
        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('/login/index');
            });
            return;
        }
        req.flash('success', 'Usuário logado.'); 
        req.session.user = login.user;
        req.session.save(() => {
            return res.redirect('/');
        });
    
    } catch(e) {
        console.log(e);
        return res.render('404');
    }

};

exports.logout = function (req, res) {
    req.session.destroy();
    res.redirect('/login/index');
};


