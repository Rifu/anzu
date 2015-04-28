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
      source: '/assets/music/01. 人にやさしく.mp3',
      albumArt: '/assets/img/album_art/rolling_girls.jpg'
    },
    {
      id: 2,
      albumArt: '/assets/img/album_art/lwa.jpg',
      artist: 'colate',
      title: 'エレクトロサチュレイタ (Starry electro mix)',
      source: '/assets/music/エレクトロサチュレイタ (Starry electro mix).mp3'
    },
    {
      id: 3,
      albumArt: '/assets/img/album_art/fsn.jpg',
      artist: 'tamame',
      title: "あの森で待ってる(tamame's the Promise Kiss Remix)",
      source: "/assets/music/あの森で待ってる(tamame's the Promise Kiss Remix).mp3"
    },
    {
      id: 4,
      albumArt: '/assets/img/album_art/stones.jpg',
      artist: 'momi-han',
      title: "STONES",
      source: "/assets/music/01. STONES.mp3"
    }
  ]
});
 
export default Track;