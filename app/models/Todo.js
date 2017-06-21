const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const todoSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  labels: [{
    type: Schema.Types.ObjectId,
    ref: 'Label',
  }],
},{
  timestamps: true,
});
module.exports = todoSchema;
