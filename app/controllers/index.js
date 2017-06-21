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

function fetchSingleTodo(req, res, next) {
  const todoId = {_id: req.params.id};
  todoLib.fetchSingleTodo(todoId, function (errorInFetch, fetchedTodo) {
    if (errorInFetch) {
      res.status(500).json(errorInFetch);
      return;
    }
    res.status(200).json(fetchedTodo);
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

function fetchLabel(req, res, next) {
  labelLib.fetchlabel(function (errorInFetch, fetchedLabels) {
    if (errorInFetch) {
      res.status(500).json(errorInFetch);
      return;
    }
    res.status(200).json(fetchedLabels);
  });
}

function fetchSinglelabel(req, res, next) {
  const labelID = { _id: req.params.id };
  labelLib.fetchSinglelabel(labelID, function (errorInFetch, foundLabel) {
    if (errorInFetch) {
      res.status(500).json(errorInFetch);
      return;
    }
    res.status(200).json(foundLabel);
  });
}

function updateLabel(req, res, next) {
  const labelID = { _id: req.params.label_id };

  labelLib.fetchSinglelabel(labelID, function (errorInFetch, foundLabel) {
    if (errorInFetch) {
      res.status(500).json(errorInFetch);
      return;
    }
    const foundObj = {
      _id: foundLabel._id,
      title: req.body.title,
      color: req.body.color,
    }
    labelLib.updateLabel(foundObj, function (errorInFetch, updateLabel) {
      if (errorInFetch) {
        res.status(500).json(errorInFetch);
        return;
      }

      res.status(200).json(updateLabel);
    });
  });
}



router.post('/todo', createTodo);
router.get('/todo', fetchTodo);
router.get('/todo/:id', fetchSingleTodo);
router.get('/label', fetchLabel);
router.get('/label/:id', fetchSinglelabel);
router.post('/label/:id', createLabel);
router.post('/label/:label_id/update', updateLabel);
module.exports = router;
