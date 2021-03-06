import Ember from "ember";

var PlaylistItemComponent = Ember.Component.extend({
  classNames: ["playlist-item-container"],
  skipToTrack: "skipToTrack",
  playing: function(){
    return this.get("index") == this.get("currentTrack")
  }.property("index", "currentTrack"),

  actions:{
    skipToTrack: function(){
      if(!this.get("playing")){
        this.sendAction("skipToTrack", this.get("index"))
      }
    },
  }
});

export default PlaylistItemComponent;