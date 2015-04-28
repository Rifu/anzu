import Ember from "ember"
var TracksRoute = Ember.Route.extend({
  setupController: function(controller, model){
    controller.set("model", this.store.find("track"));
  }
});

export default TracksRoute;