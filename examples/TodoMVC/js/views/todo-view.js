YUI.add('todo-view', function (Y) {
  'use strict';

  // -- Todo View -------------------
  Y.namespace('TodoMVC').TodoView = Y.Base.create('todoView', Y.RView, [], {

    // Compile our template using Handlebars.
    template: '#item-template',

    // Bind DOM events for handling changes to a specific Todo,
    // for completion and editing.
    events: {
      '.toggle': { click: 'toggleComplete' },
      'label': { dblclick: 'edit' },
      '.edit': { blur: 'doneEdit', keypress: 'enterUpdate' },
      '.destroy': { click: 'clear' }
    },

    // Initialize this view by setting event handlers when the Model
    // is updated or destroyed.
    initializer: function () {
      var model = this.get('model');
      if (model) {
        this.listenTo(model, 'change', this.render);
      }
    },

    afterRender: function () {
      var container = this.get('container');

      container.toggleClass('completed', this.get('model').get('completed'));
      this.set('inputNode', container.one('.edit'));
    },

    // Toggle the linked Todo's completion status.
    toggleComplete: function () {
      this.get('model').toggle();
    },

    // Turn on editing mode for the Todo by exposing the input field.
    edit: function () {
      this.get('container').addClass('editing');
      this.get('inputNode').focus();
    },

    // Get the value from our input field while hiding it, and
    // save it to our Todo when focus is lost from the field.
    doneEdit: function () {
      var editedValue = this.get('inputNode').get('value');

      this.get('container').removeClass('editing');

      if (editedValue) {
        this.get('model').save({title: editedValue});
      } else {
        this.clear();
      }
    },

    // Also allow updating the Todo's text through the enter key.
    enterUpdate: function (e) {
      var ENTER_KEY = 13;
      if (e.keyCode === ENTER_KEY) {
        this.doneEdit();
      }
    },

    // Destroy the model when the delete button is clicked.
    clear: function () {
      this.get('model').clear();
    }
  });
}, '@VERSION@', {
  requires: ['gallery-rocket-view', 'event-focus']
});
