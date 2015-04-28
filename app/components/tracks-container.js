import Ember from "ember";

var TracksContainerComponent = Ember.Component.extend({
  tracks: Ember.A(),
  queueSong: "queueSong",
  didInsertElement: function(){
    var store = this.get("store")
    var tracksContainer = this.get("tracks")
    var self = this
    store.find("track").then(function(tracks){
      tracks.forEach(function(track){
        tracksContainer.pushObject(track)
      })
    })
  },

  actions: {
    queueSong: function(track){
      this.sendAction("queueSong", track)
    }
  }
})

export default TracksContainerComponent;