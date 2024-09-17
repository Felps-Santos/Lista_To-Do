var express = require('express');
var router = express.Router();
const todo = require('../models/todo');

router.post('/cadastrar', async (req, res) => {
  const { tarefa, data } = req.body;
  try{
      const novaTarefa = new todo({ tarefa, data_conclusao: data });
      await novaTarefa.save();
      res.redirect('/home')
  } catch(err){
      res.status(500).send(err.message);
  }
});

/* GET cadastro page. */
router.get('/', function(req, res, next) {
  res.render('cadastro');
});

module.exports = router;
