YUI.add('gallery-rocket-model', function (Y, NAME) {

'use strict';

var Model;

// TODO add model relate support. aka hasOne, hasMany
Model = Y.Base.create('rocketModel', Y.Model, [Y.REventBroker], {
  initializer: function(config) {
  },

  destructor: function() {
    this.stopListening();
  }
}, {
  ATTRS: {
  }
});

Y.RModel = Model;


}, '0.1.0', {"requires": ["model", "gallery-rocket-event-broker"]});
