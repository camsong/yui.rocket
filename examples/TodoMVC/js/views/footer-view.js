YUI.add('footer-view', function (Y) {
  'use strict';

  Y.namespace('TodoMVC').FooterView = Y.Base.create('footerView', Y.RView, [], {
  }, {
    ATTRS: {
      completed: { value: 0 },
      remaining: { value: 0 }
    }
  });
}, '@VERSION@', {
  requires: ['gallery-rocket-view']
});
