var EmberApp = window.EmberApp = Ember.Application.create({
	LOG_TRANSITIONS: true,

	CROSS_DOMAIN: true,

	URL_BASE: '', //'http://localhost:3000',

	CSRF_TOKEN: '',
	REQ_FORGERY_TOKEN: '',

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
