YUI.add('todo-layout', function (Y) {
  'use strict';

  // -- Todo Layout -------------------
  Y.namespace('TodoMVC').TodoLayout = Y.Base.create('todoLayout', Y.RLayout, [], {
    events: {
      '#new-todo': { keypress: 'enterCreate' },
      '#clear-completed': { click: 'clearCompleted' },
      '#toggle-all': { click: 'completeAll' }
    },

    regions: {
      header: '#header',
      main: '#main',
      todoList: '#todo-list',
      footer: '#footer'
    },

    initializer: function() {
      this.set('modelList', new Y.TodoMVC.TodoList());
      this.get('modelList').load();

      Y.Handlebars.registerHelper('pluralize', function (context, word) {
        return (context === 1) ? word : word + 's';
      });
    },

    bindUI: function() {
      this.get('modelList').after(['add', 'remove', 'reset', 'todo:completedChange'], this.refreshFooter, this);
      this.after('filterChange', this.render);
      Y.RLayout.prototype.bindUI.apply(this);
    },

    afterRender: function() {
      var modelList = this.get('modelList');
      if (this.get('modelList').size()) {
        var models;
        switch (this.get('filter')) {
        case 'active':
          models = modelList.remaining();
          break;
        case 'completed':
          models = modelList.completed();
          break;
        default:
          models = modelList;
          break;
        }
        this.todoList.show(new Y.TodoMVC.TodoListView({modelList: models}));
      } else {
        this.main.hide();
        this.footer.hide();
      }
      this.refreshFooter();
    },

    // Create and save a new Todo from the inputted value when the
    // Enter key is pressed down.
    enterCreate: function (e) {
      var ENTER_KEY = 13,
          inputNode = this.one('#new-todo'),
          value = inputNode.get('value');

      if (e.keyCode !== ENTER_KEY || !value) { return; }

      this.get('modelList').create({title: value});

      inputNode.set('value', '');
      //this.refreshFooter();
    },

    // Clear all completed Todos from the TodoList. This removes the models
    // from the list, as well as deletes them from localStorage.
    clearCompleted: function (e) {
      var modelList = this.get('modelList');
      var completed = modelList.completed();

      modelList.remove(completed);

      completed.each(function (todo) {
        todo.clear();
      });
      this.refreshFooter();
    },

    // Complete all non-complete Todos, or reset them all if they are
    // all already complete.
    completeAll: function (e) {
      var completed = this.one('#toggle-all').get('checked');

      this.get('modelList').each(function (todo) {
        todo.save({completed: completed});
      });
      this.refreshFooter();
    },

    refreshFooter: function() {
      var modelList = this.get('modelList');
      var completed = modelList.completed().size();
      var remaining = modelList.remaining().size();

      if (modelList.size()) {
        this.footer.show(new Y.TodoMVC.FooterView({
          completed: completed,
          remaining: remaining
        }));
        // Highlights for filters at the bottom of our Todo application.
        this.all('#filters li a').removeClass('selected');
        this.all('#filters li a').filter('[href="#/' + (this.get('filter') || '') + '"]').addClass('selected');
      }

      // Set the checkbox only if all Todos have been completed.
      Y.one('#toggle-all').set('checked', !remaining);
    }
  }, {
    ATTRS: {
      filter: {
        value: null
      }
    }
  });
}, '@VERSION@', {
  requires: ['gallery-rocket-layout', 'footer-view', 'todos', 'todo-list']
});
