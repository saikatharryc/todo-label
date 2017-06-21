/**
 *
 * This file should contain the base path for each of the different
 * kinds of users that we have in our system and import the corresponding
 * routes for that particular user.
 *
 * For examples: /cashpositive/api/v1/<ENTITY>
 *
 * We define the ENTITY base route here and import all it's subroute and attach
 * to it.
 *
 */

const express = require('express');
const todoLib = require('../../lib/todo');
const labelLib = require('../../lib/label');

const router = express.Router();


function createTodo(req, res, next) {
  todoLib.saveTodo(req.body, function (errorInSave, savedTodo) {
    if (errorInSave) {
      res.status(500).json(errorInSave);
      return;
    }
    res.status(200).json(savedTodo);
  });
};


function fetchTodo(req, res, next) {
  todoLib.fetchTodo(function (errorInFetch, fetchedTodos) {
    if (errorInFetch) {
      res.status(500).json(errorInFetch);
      return;
    }
    res.status(200).json(fetchedTodos);
  });
}



function createLabel(req, res, next) {
  const todoIdObj = { '_id': req.params.id };
  todoLib.fetchSingleTodo(todoIdObj, function (errorInFetch, fetchedTodos) {
    if (errorInFetch) {
      res.status(500).json(errorInFetch);
      return;
    }
    labelLib.savelabel(req.body, function (errorInSave, savedLabel) {
      if (errorInSave) {
        res.status(500).json(errorInSave);
        return;
      }
      fetchedTodos.labels.push(savedLabel._id);
      const todoToSave = { id: fetchedTodos._id, labels: fetchedTodos.labels };
      todoLib.labelUpdateTodo(todoToSave, function (errorInFetch, fetchedTodos) {
        if (errorInFetch) {
          res.status(500).json(errorInFetch);
          return;
        }


        res.status(200).json(savedLabel);
      });
    });
  });
}

router.post('/todo', createTodo);
router.get('/todo', fetchTodo);
router.post('/label/:id', createLabel);

module.exports = router;
