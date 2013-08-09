YUI.add('gallery-rocket', function (Y, NAME) {

'use strict';

var getClassName = Y.ClassNameManager.getClassName;

Y.App.CLASS_NAMES = {
  app  : getClassName('rocket'),
  views: getClassName('rocket', 'views')
};

Y.Rocket = Y.App;


}, '0.1.0', {
    "requires": [
        "app",
        "gallery-rocket-controller",
        "gallery-rocket-view",
        "gallery-rocket-layout",
        "gallery-rocket-list-view",
        "gallery-rocket-child-view-container",
        "gallery-rocket-region",
        "gallery-rocket-region-manager",
        "gallery-rocket-event-broker",
        "gallery-rocket-util"
    ]
});
