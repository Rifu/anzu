import Ember from "ember";

var TrackIndexController = Ember.ObjectController.extend({
	url: function(){
		return "assets/video/" + this.get("source");
	}.property("source")
});

export default TrackIndexController;