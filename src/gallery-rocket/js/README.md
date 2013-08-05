# Layout(include Region and RegionManager)
# View
# ListView

# ModelRelate
# Router
# Controller

# EventBroker

# How to handle modelList events and render
use bindUI

# close to destroy

# Capturing Link Clicks

# SSO friendly

# How to handle route, app, controller
Create App, it includes routes, and dispatch the match to controller's actions.

But how to handle the route based request and normal click behavior?
To be more concise: for the layout is already rendered, a new click is fired, it
just need to do a bit change.
If the user open the first time directly use the url, he need to render the
layout

So do i need to define the first render?
Just use routes to refresh the whole page at first. If you want to refresh
a partial don't use route

# App
App only extend routes


RELEASE LIST:
close -> destructor
build tool -> build tool
push to yui gallary
Simple demo page

Next step: ModelRelate
Add View clientId to DOM container id
Find view by DOM, like widget

