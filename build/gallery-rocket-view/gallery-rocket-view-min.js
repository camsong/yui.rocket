YUI.add("gallery-rocket-view",function(e,t){"use strict";var n,r=YUI.namespace("Env.View"),i="render",s="rendered",o="destroyed",u=function(){};n=e.Base.create("rocketView",e.View,[e.REventBroker],{initializer:function(e){},destructor:function(){this.stopListening()},destroy:function(t){if(this.get(o))return;typeof t=="undefined"&&(t=!0),t?e.View.prototype.destroy.call(this,{remove:!0}):(e.View.prototype.destroy.call(this),this.get("container").empty())},toJSON:function(){var e=this.getAttrs();return delete e.clientId,delete e.initialized,delete e[o],delete e[s],delete e.container,e},show:function(){this.get("container")&&this.get("container").show()},hide:function(){this.get("container")&&this.get("container").hide()},one:function(){var e=this.get("container");return e.one.apply(e,arguments)},all:function(){var e=this.get("container");return e.all.apply(e,arguments)},generateClientId:function(){return r.lastId||(r.lastId=0),this.constructor.NAME+"_"+(r.lastId+=1)},getTemplateFunction:function(){var t=this.get("template")||"#"+e.ZUI.Util.dasherize(this.name)+"-template",n=e.one(t)?e.one(t).getHTML():t;return e.Handlebars.compile(n)},getTemplateData:function(){var t=this.toJSON(),n=this.get("model"),r=this.get("modelList");if(n){var i=n.toJSON();delete i.id,t=e.merge(t,i)}return r&&(t.modelList=r.toJSON()),t},beforeRender:u,afterRender:u,bindUI:u,render:function(){if(this.get(o))throw new Error("render failed, view has been destroyed");return this._publishRender&&this._publishRender.detach(),this._publishRender=this.publish(i,{queuable:!1,fireOnce:!1,defaultTargetOnly:!0,defaultFn:this._defRenderFn}),this.fire(i),this},_defRenderFn:function(){this.beforeRender(),this.renderer(),this.afterRender(),this.stopListening(),this.bindUI(),this._set(s,!0)},renderer:function(){var e=this.getTemplateFunction()(this.getTemplateData());this.get("container").setHTML(e)}},{ATTRS:{clientId:{valueFn:"generateClientId",readOnly:!0},template:{value:null},model:{value:null},modelList:{value:null},rendered:{value:!1}}}),e.RView=n},"0.1.0",{requires:["view","base","event","handlebars","gallery-rocket-util","gallery-rocket-event-broker"]});
