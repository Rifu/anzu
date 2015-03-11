import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource('tracks', { path: '/tracks'}, function(){
		this.route('index');
	});
	this.resource('track', { path: '/track/:track_id' }, function(){

	});
});

export default Router;
