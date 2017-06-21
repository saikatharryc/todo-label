const Models = require('../app/models');

function saveTodo(todo, callback) {
  const todoObj = new Models.Todo({
    username: todo.username,
    title: todo.title,
    description: todo.description,
    createdon: Date.now(),
  });
  todoObj.save(function (errInSave, saveTodo) {
    if (errInSave) {
      callback({
        type: 'DB_ERROR',
        msg: 'Failed to Create a new Todo.',
        errorDetail: String(errInSave),
      });
      return errInSave;
    }
    callback(null, saveTodo);
  });
}

function fetchTodo(callback) {
  Models.Todo
    .find({})
    .populate('labels')
    .lean()
    .exec(function (fetchError, todos) {
      if (fetchError) {
        waterfallCallback({
          type: 'DB_ERROR',
          msg: 'All todo Fetch Error',
          errorDetails: String(fetchError),
        });
        return;
      }
      callback(null, todos);
    });
}

function fetchSingleTodo(instanceId, callback) {
  Models.Todo
    .findOne(instanceId)
    .populate('labels')
    .lean()
    .exec(function (fetchError, todos) {
      if (fetchError) {
        waterfallCallback({
          type: 'DB_ERROR',
          msg: 'All todo Fetch Error',
          errorDetails: String(fetchError),
        });
        return;
      }
      callback(null, todos);
    });
}

function labelUpdateTodo(todoToSave, callback) {
  Models.Todo.findById(todoToSave.id, function (err, doc) {
    if (err) {
      callback(err, null);
    }
    // Updating the existing instance
    doc.labels = todoToSave.labels;
    // Save the Updated object to the Database
    doc.save(function (errInSave, SavedTodo) {
      if (errInSave) {
        callback({
          type: 'DB_ERROR',
          msg: 'Failed to Update a Todo Instance.',
          errorDetail: String(errInSave),
        });
      }
      callback(null, SavedTodo);
    });
  });

}

module.exports = {
  saveTodo: saveTodo,
  fetchTodo: fetchTodo,
  fetchSingleTodo: fetchSingleTodo,
  labelUpdateTodo: labelUpdateTodo,
};
