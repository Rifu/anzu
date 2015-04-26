import Ember from "ember";

var NowPlayingComponent = Ember.Component.extend({
	classNames: ["now-playing-container"],
	playing: Ember.A(),
	np: {
		albumArt: '/assets/img/hypnobutt.gif', 
		title: 'Select Track'
	},
	npDummy: {
		albumArt: '/assets/img/hypnobutt.gif', 
		title: 'Select Track'
	},
	currentTrack: 0,
	soundContainer: null,
	autoplay: true,
	duration: 0,
	currentTime: 0,
	timerHelper: null,
	isPlaying: false,
	isLoaded: false,
	npId: 0,

	didInsertElement: function(){
		this.animateEntry()
		this.createPlayer()
	},
	createPlayer: function(){
		createjs.Sound.on("fileload", this.playAudio, this);
	},
	formattedTime: function(){
		return this.msToTime(this.get("currentTime"))
	}.property("currentTime"),
	formattedDuration: function(){
		return this.msToTime(this.get("duration"))
	}.property("duration"),
	progressBarHelper: function(){
		var percentProgress = (this.get("currentTime")/this.get("duration"))*100
		return "width:" + percentProgress + "%;"
	}.property("currentTime", "duration"),
	animateEntry: function(){
		this.$(".np-velocity").velocity("transition.slideDownIn", 1000);
	},
	startPlaying: function(){
		if(this.get("playlist.length") == 1){
			this.set("isPlaying", true)
			this.set("currentTrack", 0)

			var track = this.get("playlist")[this.get("playlist.length")-1]
			var self = this
			this.get("store").find("track", track.id).then(function(track){
				self.set("np", track)
				console.log(track)
				//self.get("playing").pushObject(track)
				self.loadAudio()
			})
		}
	}.observes("playlist.length"),
	loadAudio: function(){
		var track = this.get("np")
		var source = track.get("source")
		var self = this
		var sound = createjs.Sound.registerSound(source, "nowplaying", 1)
		this.set("currentTime", 0)
		this.set("duration", sound.duration)
		
		//createjs.Sound.play("nowplaying")
		// this.set("audioContainer", sound)
		// 
	},
	playAudio: function(){
		var sound = createjs.Sound.play("nowplaying")
		sound.on("complete", this.advancePlaylist, this)
		this.set("soundContainer", sound)
		this.set("duration", sound.duration)
		this.startSeek()
		this.set("isPlaying", true)
		this.set("isLoaded", true)
	},
	pauseAudio: function(){
		this.set("isPlaying", false)
		this.get("soundContainer").pause()
		this.pauseSeek()
	},
	resumeAudio: function(){
		this.set("isPlaying", true)
		this.get("soundContainer").resume()
		this.startSeek()
	},
	stopAudio: function(){
		this.set("nowplaying", false)
		this.set("isLoaded", false)
		this.set("currentTime", 0)
		this.set("duration", 10000000000)
		createjs.Sound.removeSound("nowplaying")
	},
	advancePlaylist: function(){
		if(this.get("autoplay")){
			var nextTrack = this.get("currentTrack") + 1
			if(nextTrack < this.get("playlist.length")){
				var track = this.get("playlist").objectAt(nextTrack)
				this.set("np", track)
				this.set("currentTrack", nextTrack)
				this.loadAudio()
			}else{
				this.set("np", this.get("npDummy"))
				this.set("isPlaying", false)
				this.set("isLoaded", false)
			}
		}else{
			this.set("autoplay", true)
		}
	},
	pauseSeek: function(){
		clearInterval(this.get("timerHelper"))
		var pos = this.get("soundContainer").position
		this.set("currentTime", pos)
	},
	startSeek: function(){
		this.seekHelper()
	},
	seekHelper: function(){
		if(this.get("isPlaying")){
			console.log("whee")
			clearInterval(this.get("timerHelper"))
			var self = this
			var t = setInterval(function(){
				self.set("currentTime", self.get("soundContainer").position)
			}, 100)
		}
	},
	msToTime: function(s) {
	  var ms = s % 1000
	  s = (s - ms) / 1000
	  var secs = s % 60
	  s = (s - secs) / 60
	  var mins = s % 60
	  var hrs = (s - mins) / 60

	  if(secs < 10){
	  	secs = "0" + secs
	  }
	  return mins + ':' + secs
	},

	actions: {
		skipToTrack: function(trackNo){
			//this.set("autoplay", false)
			this.pauseAudio()
			this.set("isLoaded", false)
			var track = this.get("playlist").objectAt(trackNo)
			this.set("np", track)
			this.set("currentTrack", trackNo)
			Ember.run.later(this, function(){
				this.stopAudio()
				this.loadAudio()
			}, 1000)
			//this.playAudio()
		},
		play: function(){
			this.resumeAudio()
		},
		pause: function(){
			this.pauseAudio()
		}
	}
});

export default NowPlayingComponent;