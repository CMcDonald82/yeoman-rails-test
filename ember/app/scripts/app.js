var EmberApp = window.EmberApp = Ember.Application.create({
	LOG_TRANSITIONS: true,

	/*
	init: function() {
		console.log('CSRF APP: '+Ember.$.cookie('csrftoken'));
	}
	*/
	
		//

	getToken: function() {
		alert('get token');
	}
   	
});

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');
require('scripts/utils/*');
