# Backbone.ViewManager
### The Problem
Inserting many views into one DOM element leaks memory if you don't take care to unbind and remove all references to the discarded views. Quickly your fancy JS application chugs along like it was running on a 386.

### The Solution
Backbone.ViewManager extends Backbone.Model with new methods which monitor bindings and adds a `close()` method. You can then use the Backbone.ViewManager class to handle swapping views between on a common DOM element

## Installation
Include view\_manager.js (or .coffee) after Backbone.js but before your models.

## Usage
### Backbone.ViewManager
The Backbone.ViewManager object allows the management of views which are inserted into a common DOM element.
```coffeescript
    # Create a new Backbone.ViewManager, passing the a CSS selector of the object you wish to insert the views into:
    viewManager = new Backbone.ViewManager('#view-container')
    
    # Show a Backbone.View inside the viewManager element
    viewManager.showView(new MyBackboneView())

    ...

    # Show a different view inside the viewManager element, cleanly removing the prior view
    viewManager.showView(new AnotherView())
```

The `showView` calls `.close()` on the current view before inserting the new one.

### Backbone.Model extensions
Backbone.Model is extended with 3 new methods:

* *bindTo* - Use this method in place of `Backbone.Events.on()`. It behaves the same as `.on()`, but keeps a reference of the binding. Takes 3 argments:
  * *model* - The model to bind to
  * *event* - The even to listen for
  * *callback* - Callback method on event
  Example:

```coffeescript
    post.on('update', callback)
    # Becomes...
    this.bindTo(post, 'update', callback)
```

* *unbindFromAll* - ...
* *close* - ...
