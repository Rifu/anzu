import Ember from "ember";

var NowPlayingComponent = Ember.Component.extend({
	classNames: ["now-playing-container"],
	playing: Ember.A(),
	np: null,
	currentTrack: 0,
	howlContainer: null,
	autoplay: true,
	duration: 0,
	currentTime: 0,
	timerHelper: null,
	didInsertElement: function(){
		this.animateEntry();
	},
	progressBarHelper: function(){
		var percentProgress = (this.get("currentTime")/this.get("duration"))*100
		return "width:" + percentProgress + "%;"
	}.property("currentTime", "duration"),
	animateEntry: function(){
		this.$(".np-velocity").velocity("transition.slideDownIn", 1000);
	},
	startPlaying: function(){
		if(this.get("playlist.length") == 1){
			var track = this.get("playlist")[this.get("playlist.length")-1]
			var self = this
			this.get("store").find("track", track.id).then(function(track){
				self.set("np", track)
				//self.get("playing").pushObject(track)
				self.loadAudio()
			})
		}
	}.observes("playlist.length"),
	loadAudio: function(){
		var track = this.get("np")
		var self = this
		var sound = new Howl({
			src: [track.get("source")],
			onend: function(){
				self.advancePlaylist()
			},
			onload: function(){
				self.set("duration", this.duration())
			}
		});
		sound.play();
		this.set("howlContainer", sound)
		this.set("duration", sound.duration())
		console.log(sound.seek())
	},
	playAudio: function(){

	},
	stopAudio: function(){
		this.get("howlContainer").unload()
	},
	advancePlaylist: function(){
		if(this.get("autoplay")){
			var nextTrack = this.get("currentTrack") + 1
			if(nextTrack <= this.get("playlist.length")){
				var track = this.get("playlist").objectAt(nextTrack)
				this.set("np", track)
				this.set("currentTrack", nextTrack)
				this.loadAudio()
			}
		}else{
			this.set("autoplay", true)
		}
	},
	seekHelper: function(){
		clearInterval(this.get("timerHelper"))
		var self = this
		var t = setInterval(function(){
			self.set("currentTime", self.get("howlContainer").seek())
		}, 100)
	}.observes("howlContainer"),

	actions: {
		skipToTrack: function(trackNo){
			console.log(this.get("howlContainer").seek())
			this.set("autoplay", false)
			this.stopAudio()
			var track = this.get("playlist").objectAt(trackNo)
			this.set("np", track)
			this.set("currentTrack", trackNo)
			this.loadAudio()
		}
	}
});

export default NowPlayingComponent;