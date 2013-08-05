'use strict';

var View,
    GlobalEnv = YUI.namespace('Env.View'),
    RENDER = "render",
    RENDERED = "rendered",
    DESTROYED = "destroyed",
    EMPTY_FN = function() {};

View = Y.Base.create('rocketView', Y.View, [Y.REventBroker], {
  // -- Lifecycle Methods ----------------------------------------------------
  initializer: function(config) {
    //this.listenTo(this, "show", this.onShowCalled, this);
  },

  destructor: function() {
    this.stopListening();
  },

  // default to remove container
  // destroyContainer=false will keep the container node
  destroy: function(destroyContainer) {
    if (this.get(DESTROYED)) { return; }
    if (typeof destroyContainer === 'undefined') { destroyContainer = true; }
    if (destroyContainer) {
      Y.View.prototype.destroy.call(this, {remove: true});
    } else {
      Y.View.prototype.destroy.call(this);
      this.get('container').empty();
    }
  },

  toJSON: function() {
    var attrs = this.getAttrs();
    delete attrs.clientId;
    delete attrs.initialized;
    delete attrs[DESTROYED];
    delete attrs[RENDERED];
    delete attrs.container;
    return attrs;
  },

  show: function() {
    this.get('container') && this.get('container').show();
  },

  hide: function() {
    this.get('container') && this.get('container').hide();
  },

  one: function() {
    var container = this.get('container');
    return container.one.apply(container, arguments);
  },

  all: function() {
    var container = this.get('container');
    return container.all.apply(container, arguments);
  },

  generateClientId: function () {
    GlobalEnv.lastId || (GlobalEnv.lastId = 0);
    return this.constructor.NAME + '_' + (GlobalEnv.lastId += 1);
  },

  // Rendering and events binding
  // ---------

  // Returns the compiled template function.
  // template can be a handlebar string, or a selector string.
  // template default to the [dasherized-view-name]-template
  getTemplateFunction: function() {
    var template = this.get('template') || '#' + Y.ZUI.Util.dasherize(this.name) + '-template';
    var templateHtml = Y.one(template) ? Y.one(template).getHTML() : template;
    return Y.Handlebars.compile(templateHtml);
  },

  // Get the view, model, modelList data for the templating function
  getTemplateData: function() {
    var data = this.toJSON(),
        model = this.get('model'),
        modelList = this.get('modelList');

    // merge model data directly, model data has higher priority
    if (model) {
      var modelData = model.toJSON();
      delete modelData.id;
      data = Y.merge(data, modelData);
    }
    if (modelList) { data.modelList = modelList.toJSON(); }
    return data;
  },

  // called before view is rendered,
  // noop function, override this.
  beforeRender: EMPTY_FN,

  // called after view is rendered,
  // noop function, override this.
  afterRender: EMPTY_FN,

  // bind events to the UI, called after view is rendered.
  // noop function, override this.
  bindUI: EMPTY_FN,

  // Main render function.
  render: function() {
    if (this.get(DESTROYED)) { throw new Error("render failed, view has been destroyed"); }
    // Subscribers to the "on" moment of this event, will be notified before the view is rendered.
    // Subscribers to the "after" moment of this event, will be notified after rendering is complete.
    if (this._publishRender) { this._publishRender.detach(); }
    this._publishRender = this.publish(RENDER, {
      queuable: false,
      fireOnce: false,    // so that it can always fire render event
      defaultTargetOnly: true,
      defaultFn: this._defRenderFn
    });
    this.fire(RENDER);
    return this;
  },

  _defRenderFn: function() {
    this.beforeRender();
    this.renderer();
    this.afterRender();
    this.stopListening();
    this.bindUI();
    this._set(RENDERED, true);
  },

  // override this if you want a customized renderer method
  renderer: function() {
    var html = this.getTemplateFunction()(this.getTemplateData());
    this.get('container').setHTML(html);
  }
}, {
  ATTRS: {
    clientId: {
      valueFn : 'generateClientId',
      readOnly: true
    },
    template: {
      value: null
    },
    model: {
      value: null
    },
    modelList: {
      value: null
    },
    // Flag indicating whether or not this view has been rendered.
    rendered: {
      value:false
    }
  }
});

Y.RView = View;
