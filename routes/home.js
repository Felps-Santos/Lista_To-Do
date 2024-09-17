const express = require('express');
const router = express.Router();
const todo = require('../models/todo');
const { MongoClient, ObjectId } = require('mongodb');
const { format } = require('date-fns');
const { ptBR } = require('date-fns/locale');

// Rota para listar todas as tarefas salvas no banco de dados, 'async' é tipo como esperar, 
// significa para esperar alguma coisa, esperar uma resposta

router.get('/', async (req, res) => {
    try {
        const todos = await todo.find();
        res.render('home', {todos, format, ptBR});
    } catch(err) {
        res.status(500).send(err.message);
    }
});

// Rota para deletar uma tarefa
router.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
      await todo.deleteOne({ _id: new ObjectId(id) });
      res.redirect('/home');
  } catch (err) {
      res.status(500).send(err.message);
  }
});

//Rota para editar a tarefa
router.get('/editar/:id', async(req, res) => {
  try {
    console.log("Entrou no editar!!!")
    const todos = await todo.findById(req.params.id);
    console.log(todos);
    res.render("edit", { todos, format, ptBR });
    console.log("Conseguiu renderizar")
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Rota para atualizar a tarefa
router.post('/atualizar/:id', async(req, res) => {
  const { tarefa, data_conclusao } = req.body;
  try {
    await todo.findByIdAndUpdate(req.params.id, { tarefa, data_conclusao });
    res.redirect("/home");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Rota para atualizar o status da tarefa para "Concluída"
router.post('/concluir/:id', async (req, res) => {
  try {
    // Atualiza o campo "status" da tarefa para "Concluída"
    await todo.findByIdAndUpdate(req.params.id, { status: 'Concluída' });
    res.redirect("/home");
  } catch (err) {
    res.status(500).send(err.message);
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

module.exports = router;
