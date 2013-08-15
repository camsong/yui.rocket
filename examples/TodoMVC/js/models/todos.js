YUI.add('todos', function (Y) {
  'use strict';

  // -- TodoList Model list -----
  Y.namespace('TodoMVC').TodoList = Y.Base.create('todoList', Y.ModelList, [Y.ModelSync.Local], {
    // The related Model for our Model List.
    model: Y.TodoMVC.Todo,

    // The root used for our localStorage key.
    root: 'todos-yui',

    // Return a ModelList of our completed Models.
    completed: function () {
      return this.filter({asList: true}, function (todo) {
        return todo.get('completed');
      });
    },

    // Return an ModelList of our un-completed Models.
    remaining: function () {
      return this.filter({asList: true}, function (todo) {
        return !todo.get('completed');
      });
    }
  });

}, '@VERSION@', {
  requires: ['gallery-model-sync-local', 'model-list', 'todo']
});
