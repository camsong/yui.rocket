YUI.Rocket(Rocket.JS)
========

![logo](https://raw.github.com/camsong/yui.rocket/master/public/RocketJS_logo.png)

Make your YUI apps rock!

## Features

* Easy Data Binding
* ModelList Rendering
* Region Rendering
* Event Enhancements
* Handlebars Default
* YUI Best Practices

## Getting Started

####Require RocketJS
Rocket.JS is already pushed to YUI Gallery, so you can use YUI CDN to get Rocket.JS

```
// Put the YUI seed file on your page.
<script src="http://yui.yahooapis.com/3.12.0/build/yui/yui-min.js"></script>

<script>
// Create a YUI sandbox on your page.
YUI().use('gallery-rocket', function(Y)
    // The Rocket.JS modules are loaded and ready to use.
    // Your code goes here!
});
</script>
```

####Hello Rocket
Rocket is aimed to build complex applications but it's easy to get started.
Template is handlebars.JS by default.

```
var view = new Y.RView({
  template: 'Hello {{beauty}}',
  beauty: 'Rocket'
});

view.render();
```

####Model Binding
By default every property of your view is automatically available in the template. If a model is bound its attributes will also be made available.

```
var model = new Y.RModel({
  beauty: 'Rocket'
});

var view = new RView({
  model: model,
  love: 'hello',
  template: '{{love}} {{beauty}}',
});
```

####List rendering
Easily render list with the ListView. Thorax will make sure that your view stays current as models in your modelList are added, removed or updated.

```
var models = new Y.ModelList({
  items: [
    {firstName: 'Brendan', lastName: 'Eich'},
    {firstName: 'Yukihiro', lastName: 'Matsumoto'},
    {firstName: 'Paul', lastName: 'Graham'}
  ]
});

var view = new Y.RView({
  template: "{{firstName}} - {{lastName}}"
});

var view = new Y.RListView({
  itemView: view,
  modelList: models
});
```

will generate HTML:

```
<ul>
  <li>Brendan - Eich</li>
  <li>Yukihiro - Matsumoto</li>
  <li>Paul - Graham</li>
</ul>
```

####Layout rendering

HTML:

```
<div id='main'></div>
<div id='footer'></div>
```

JavaScript:
```
var layout = new Y.RLayout({
  regions: {
    main: '#main',
    footer: '#footer'
  }
});

var mainView1 = new Y.RView();
var mainView2 = new Y.RView();
var footerView = new Y.RView();

layout.footer.show(footerView);  // show footerView under <div id='footer'>
layout.main.show(mainView1);  // show mainView1 under <div id='main'>
layout.footerView.show(headerView2);  // close mainView1 and show mainView2 under <div id='main'>

```

## Modules List
* **Y.Rocket**: An application object that starts your app via initializers, routes and more.
* **Y.RController**: A general purpose object for controlling modules, routers, view, and implementing a mediator pattern.
* **Y.RModel**: Create modules and sub-modules within the application.
* Views and related modules
  * **Y.RView**: Base View that can render.
  * **Y.RListView**: A view that iterates over a modelList, and renders individual ItemView instances for each model.
  * **Y.RLayout**: A view that can map DOMs to different regions, and manage lifecycle of the view in the region.
  * **Y.RRegion**: A managable area related to a DOM.
  * **Y.RRegionManager**: Manager of Y.RRegion, used by Y.RLayout.
* **Y.REventBroker**: Enhance event managment, add `stopListening`, `listenTo` and more.
