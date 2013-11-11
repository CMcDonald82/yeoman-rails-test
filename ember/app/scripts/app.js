var EmberApp = window.EmberApp = Ember.Application.create({
	LOG_TRANSITIONS: true,


	PRODUCTION_SETTINGS: true,

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

	currentPath: '',
	

	/*
	getToken: function() {
		alert('get token');
	}
	*/


	// Now broken out into 2 separate route parent classes: CheckAuthRoute and ProtectedAuthRoute	
	/*
	checkAuth: function(urlNext, role, authorize) {
		var that = this;
		var data = {};
		var authUrlExt = '';
		if (role) {
			data['role'] = role;
		}
		data['access_token'] = $.cookie('apitoken');
		if (authorize) {
			authUrlExt = '/protect_auth';
		} else {
			authUrlExt = '/check_auth';
		}
		Ember.$.get(that.URL_BASE+authUrlExt, data).then(function(resp) {
			if (resp['msg'] === "SUCCESS") {
				if (!authorize) {
					if (resp['role'] === "type1") {
						that.transitionToRoute('patient');
					} else if (resp['role'] === "type2") {
						that.transitionToRoute('typetwo');
					} else {
						that.transitionToRoute('index');
					}
				} else {
					that.transitionToRoute(urlNext);
				}
			} else {
				that.transitionToRoute('index');
			}
		}, function(err) {
			that.transitionToRoute('index');
		});
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

