# Backbone.ViewManager
### The Problem
By default, Backbone.View can quite easily leak memory, even if you're taking care to use the unbind and remove methods when disposing of views. This can quickly become an issue if your application frequently creates and removes views, as zombie views remain bound to model events, causing performance to degrade at an alarming rate. For a good overview, see Derick Bailey's post: http://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/

### The Solution
Backbone.ViewManager extends Backbone.View with new methods which monitor bindings (the main cause of view memory leakage). You can then use the Backbone.ViewManager class to handle swapping between views on a common DOM element.

## Installation
Include view\_manager.js (or .coffee) after Backbone.js but before your backbone application.

## Usage
### Backbone.View extensions
Backbone.View is extended with some new methods which allow the monitoring and disconnetion of bindings

* **bindTo** - Use this method in place of `Backbone.Events.on()`. It behaves the same as `.on()`, but keeps a reference of the binding. Takes 3 argments:
  * **model** - The object to bind to
  * **event** - The event to listen for
  * **callback** - Callback method on event
  Example:

```coffeescript
  post.on('update', callback)
  # Becomes...
  this.bindTo(post, 'update', callback)
```
* **close** - This method removes the backbone view, unbinding from all events. This method is called by Backbone.ViewManager on old views when swapping a new one in. You can add an optional `onClose` method to your models, if there is anything else you want to do when a view is removed.

### Backbone.ViewManager
Once you've updated your application to use the above methods, you can use the Backbone.ViewManager object to manage views which are inserted into a common DOM element.
```coffeescript
  # Create a new Backbone.ViewManager, passing the a CSS selector of the object you wish to insert the views into:
  viewManager = new Backbone.ViewManager('#view-container')
  
  # Show a Backbone.View inside the viewManager element
  viewManager.showView(new MyBackboneView())

  # Show a different view inside the viewManager element, cleanly removing the prior view
  viewManager.showView(new AnotherView())
```

The `showView` calls `.close()` on the current view before inserting the new one, allowing you to swap views in and out without worrying about bindings leaking.

## Notes
This project was developed to fill a personal need, but hopefully will prove useful to others. Contributions very welcome.
The plugin is heavily inspired by Derick Bailey's post: http://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
and JohnnyO http://stackoverflow.com/questions/7567404/backbone-js-repopulate-or-recreate-the-view/7607853#7607853
