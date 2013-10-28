var EmberApp = window.EmberApp = Ember.Application.create({
	LOG_TRANSITIONS: true,


	PRODUCTION_SETTINGS: false,

	CROSS_DOMAIN: '',
	URL_BASE: '',

	//initialize: function() {
		
		
		/*
		if (this.PRODUCTION_SETTINGS === true) {
			this.CROSS_DOMAIN = false;
			this.URL_BASE = '';
		} else {
			this.CROSS_DOMAIN = true;
			this.URL_BASE = 'http://localhost:3000';
		}
		*/
	//},


	CSRF_TOKEN: '',
	REQ_FORGERY_TOKEN: '', //Can probably remove this
	API_TOKEN: '',

	/*
	getToken: function() {
		alert('get token');
	}
	*/
});

console.log('this.PRODUCTION_SETTINGS: '+EmberApp.PRODUCTION_SETTINGS);
if (EmberApp.PRODUCTION_SETTINGS === true) {
			EmberApp.CROSS_DOMAIN = false;
			EmberApp.URL_BASE = '';
		} else {
			EmberApp.CROSS_DOMAIN = true;
			EmberApp.URL_BASE = 'http://localhost:3000';
		}


/* Order and include as you please. */
require('scripts/components/*');
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');
require('scripts/utils/*');

