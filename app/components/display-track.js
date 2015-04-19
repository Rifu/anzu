import Ember from "ember";

var DisplayTrackComponent = Ember.Component.extend({
	queueSong: "queueSong",
	alt: function(){
		return this.get("track.title") + " Album Art"
	}.property("track.title"),

	actions: {
		queueSong: function(){
			this.sendAction("queueSong", this.get("track"))
		}
	}

})

export default DisplayTrackComponent;