const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/tipo')
const Categoria = mongoose.model('categorias')



router.get('/', (req, res) => {
    res.render('index.handlebars')
})

router.get('/inicio', (req, res) => {
    res.render('task/primeiraPagina')
}) 

router.get('/sobre', (req, res) => {
    res.render('task/sobre.handlebars')
})

router.get('/listarTarefas', (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render('task/primeiraPagina.handlebars', {categorias: categorias})
    }).catch((err) => {
        req.flash('error_msg', 'houve um erro ao lstar as categorias')
        res.redirect('/task')
    })
    
})

router.get('/adicionarTarefa', (req, res) => {
    res.render('task/novaTarefa.handlebars')
})

router.post('/addcategoria/nova', (req, res) => {


    const erros = []

    if(!req.body.opção1 || typeof req.body.opção1 == undefined || req.body.opção1 == null ){
        erros.push({texto: "nome inválido"})
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "email inválido"})
    }
    if(req.body.texto.length < 2) {
        erros.push({texto: "nome muito pequeno"})
    }
    if(erros.length > 0){
        res.render('task/novaTarefa', {erros: erros})
    }else{
        const novaCategoria = {
            email: req.body.email,
            opção1: req.body.opção1,
            opção2: req.body.opção2,
            texto: req.body.texto
        }
        new Categoria (novaCategoria).save().then(() => {
            req.flash('success_msg', 'categoria criada com sucesso!')
            res.redirect("/rota1/inicio")
        }).catch((err) => {
            req.flash('error_msg', 'houve um erro')
        })

    }

    })

router.get('/categorias/editar/:id', (req, res) => {
    Categoria.findOne({_id: req.params.id}).lean().then((categoria) => {
        res.render('task/editarCategoria.handlebars', {categoria: categoria})
    }).catch((err) => {
        req.flash('error_msg', 'essa categoria nao existe')
       
    })
    
})

router.post('/categorias/edit', (req, res) => {
    Categoria.findOne({_id: req.body.id}).then((categoria) =>{
        categoria.email = req.body.email
        categoria.opção1 = req.body.opção1
        categoria.opção2 = req.body.opção2
        categoria.texto = req.body.texto

        categoria.save().then(() => {
            req.flash('success_msg', 'categoria salva')
            res.redirect('/rota1/listarTarefas')
        })


    }).catch((err) => {
        req.flash('error_msg', 'houve um erro ao editar')
        res.redirect('/rota1/listarTarefas')
    })
})


router.post('/categorias/deletar', (req,res) => {
    Categoria.remove({_id: req.body.id}).then(() => {
        req.flash('success_msg', 'deletado com sucesso!')
        res.redirect('/rota1/listarTarefas')
    }).catch((err) => {
        req.flash('error_msg', 'houve um erro ao deletar')
        res.redirect('/rota1/listarTarefas')
    })
})

router.get('/postagens', (req, res) => {
    res.render('task/postagens.handlebars')
})

router.get('/postagens/add', (req, res) => {
    Categoria.find().lean().then((categorias) =>{
        res.render('task/novaPostagem.handlebars', {categorias: categorias})
    }).catch((err) => {
        req.flash('error_msg', 'houve um erro')
    })
   
})
module.exports = router




