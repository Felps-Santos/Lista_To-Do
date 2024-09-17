const mongoose = require('mongoose');

const TodoSchema = new mongoose.mongoose.Schema({
    tarefa: {type: String, required: true},
    data_conclusao: {type: Date, required: true},
    data_criacao: {type: Date, default: new Date()},
    status: {type: String, default: 'To-Do'},
});

module.exports = mongoose.model('todo', TodoSchema)