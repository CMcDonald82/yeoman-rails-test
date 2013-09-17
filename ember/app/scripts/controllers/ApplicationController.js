EmberApp.ApplicationController = Ember.ArrayController.extend({
	
	
	init: function() {
		console.log('CSRF APP: '+Ember.$.cookie('csrftoken'));
	},

});