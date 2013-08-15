YUI.add('todo-list', function (Y) {
  'use strict';

  Y.namespace('TodoMVC').TodoListView = Y.Base.create('todoListView', Y.RListView, [], {
  }, {
    ATTRS: {
      itemView: { value: Y.TodoMVC.TodoView }
    }
  });
}, '@VERSION@', {
  requires: ['gallery-rocket-list-view', 'todo-view']
});
