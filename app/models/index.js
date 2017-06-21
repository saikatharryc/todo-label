const mongoose = require('mongoose');
const labelSchema = require('./Label');
const todoSchema = require('./Todo');

module.exports = {
  Todo: mongoose.model('Todo', todoSchema),
  Label:mongoose.model('Label', labelSchema),
};
