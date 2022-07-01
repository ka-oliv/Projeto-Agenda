const req = require('express/lib/request');
const res = require('express/lib/response');
const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    res.render('contato', { contato: {} });
};

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('index'));
            return;
        }

        req.flash('success', 'Contato salvo');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato.id}`));
        return;
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.editIndex = async (req, res) => {

    if (!req.params.id) return res.render('404');

    const contato = await Contato.buscaPorId(req.params.id);
    if (!contato) return res.render('404');

    return res.render('contato', { contato: contato });
};

exports.edit = async (req, res) => {
    try {
        if (!req.params.id) return res.render('404');          
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);             
            req.session.save(() => res.redirect(`/contato/index/${contato.contato.id}`));
            return;
        }

        req.flash('success', 'Contato editado');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato.id}`));
        return;
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.delete = async (req, res) => {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.delete(req.params.id);
    if (!contato) return res.render('404');

    req.flash('success', 'Contato apagado');
    req.session.save(() => res.redirect('/'));
    return;


};