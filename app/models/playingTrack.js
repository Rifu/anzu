import DS from 'ember-data';

// a wrapper for the Howler audio object
var PlayingTrack = DS.Model.extend({
  howlerId: DS.attr('number')
});
 
export default PlayingTrack;