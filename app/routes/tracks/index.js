import Ember from "ember";

var TracksIndexRoute = Ember.Route.extend({
	setupController: function(controller, model){
		controller.set("model", this.store.find("track"));
	}
});

export default TracksIndexRoute;