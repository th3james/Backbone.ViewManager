# Backbone.ViewManager
Adds a new Backbone.ViewManager class which allows the unbinding and garbage collection of backbone view objects inside a DOM element.

## Installation
Include view_manager.js (or .coffee) after Backbone.js but before your models.

## Usage
The Backbone.ViewManager object allows the management of views which are inserted into a common DOM element.

    # Create a new Backbone.ViewManager, passing the a CSS selector of the object you wish to insert the views into:
    viewManager = new Backbone.ViewManager('#view-container')
    
    # Show a Backbone.View inside the viewManager element
    viewManager.showView(new MyBackboneView())

    ...

    # Show a different view inside the viewManager element, cleanly removing the prior view
    viewManager.showView(new AnotherView())

The `showView` method takes care of unbinding and removes the current view before inserting the new one. It does this by extending Backbone.View with a few new method.

