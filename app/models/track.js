import DS from 'ember-data';
 
var Track = DS.Model.extend({
  albumArt: DS.attr('string'),
  artist: DS.attr('string'),
  title: DS.attr('string'),
  source: DS.attr('string'),
});
 
Track.reopenClass({
  FIXTURES: [
    {
      id: 1,
      artist: 'THE ROLLING GIRLS',
      title: '人にやさしく',
      source: '/assets/video/daily_dose.mp4',
      albumArt: '/assets/img/album_art/rolling_girls.jpg'
    },
    {
      id: 2,
      albumArt: '/assets/img/album_art/lwa.jpg',
      artist: 'Asterisk',
      title: 'ハロー！きんいろモザイク - はじまりいろスプラッシュ(Asterisk DnB Remix)【From Asterisk Works 3】',
      source: '/assets/video/daily_dose.mp4'
    },
    {
      id: 3,
      title: 'Soldier Game (Dubclx Jersey Club Bootleg)!',
      source: '/assets/video/daily_dose.mp4'
    }
  ]
});
 
export default Track;