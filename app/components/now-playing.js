import Ember from "ember";

var NowPlayingComponent = Ember.Component.extend({
	classNames: ["now-playing-container"],
	didInsertElement: function(){
		this.animateEntry();
		var self = this;
		this.get('store').find("track", 1).then(function(track){
			self.set("np", track);
		});
	},
	animateEntry: function(){
		this.$(".np-velocity").velocity("transition.slideDownIn", 1000);
	},
	np: null,
	actions: {
		next: function(){
			var self = this;
			if(this.get("np.id") == 1){
				this.get('store').find("track", 2).then(function(track){
					self.set("np", track);
				});
			}else{
				this.get('store').find("track", 1).then(function(track){
					self.set("np", track);
				});
			}
		}
	}
});

export default NowPlayingComponent;