YUI.add('todo-app', function (Y) {
  'use strict';

  // -- Main Application --------------
  Y.namespace('TodoMVC').TodoApp = Y.Base.create('todoApp', Y.Rocket, [], {
    initializer: function() {
      this.layout = new Y.TodoMVC.TodoLayout({container: '#todoapp'});
      this.layout.render();
    },

    handleFilter: function(req) {
      this.layout.set('filter', req.params.filter);
    }
  }, {
    ATTRS: {
      serverRouting: {
        value: false
      },
      routes: {
        value: [{
          path: '/:filter',
          callback: 'handleFilter'
        }]
      }
    }
  });
}, '@VERSION@', {
  requires: ['gallery-rocket', 'todo', 'todos', 'todo-layout']
});
