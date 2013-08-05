YUI.add('gallery-rocket-controller', function (Y, NAME) {

'use strict';

var Controller = Y.Base.create('rocketController', Y.Base, [Y.REventBroker], {
  destructor: function() {
    this.stopListening();
  }
}, {
  ATTRS: {
  }
});

Y.RController = Controller;


}, '0.1.0', {"requires": ["gallery-rocket-event-broker"]});
