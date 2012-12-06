(function() {

  Backbone.ViewManager = (function() {

    function ViewManager(element) {
      this.element = element;
    }

    ViewManager.prototype.showView = function(view) {
      if (this.currentView) this.currentView.close();
      this.currentView = view;
      this.currentView.render();
      return $(this.element).html(this.currentView.el);
    };

    ViewManager.prototype.isEmpty = function() {
      return $(this.element).is(':empty');
    };

    return ViewManager;

  })();

  _.extend(Backbone.View.prototype, {
    bindTo: function(model, ev, callback) {
      model.bind(ev, callback, this);
      if (this.bindings == null) this.bindings = [];
      return this.bindings.push({
        model: model,
        ev: ev,
        callback: callback
      });
    },
    unbindFromAll: function() {
      if (this.bindings != null) {
        _.each(this.bindings, function(binding) {
          return binding.model.unbind(binding.ev, binding.callback);
        });
      }
      return this.bindings = [];
    },
    close: function() {
      this.unbindFromAll();
      this.unbind();
      this.remove();
      if (this.onClose) return this.onClose();
    }
  });

}).call(this);
