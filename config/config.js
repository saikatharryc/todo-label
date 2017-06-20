var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'express-todo'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/express-todo-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'express-todo'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/express-todo-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'express-todo'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/express-todo-production'
  }
};

module.exports = config[env];
