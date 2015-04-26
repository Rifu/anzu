import Ember from "ember";

var ApplicationController = Ember.Controller.extend({
	playlist: Ember.A(),
	hasPlaylist: false,

	actions: {
		queueSong: function(track){
			this.set("hasPlaylist", true)
			var self = this
			this.store.find("track", track.id).then(function(track){
				self.get("playlist").pushObject(track)
			})
		}
	}
});

export default ApplicationController;