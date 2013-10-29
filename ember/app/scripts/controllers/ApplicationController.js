EmberApp.ApplicationController = Ember.ArrayController.extend({
	
	

	init: function() {
		console.log('CSRF APP: '+Ember.$.cookie('csrftoken'));
	},

	checkAuth: function(urlNext, role, authorize) {
		alert('calling checkAuth');
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
		Ember.$.get(EmberApp.URL_BASE+authUrlExt, data).then(function(resp) {

			if (resp['msg'] === "SUCCESS") {

				if (!authorize) {
					alert('resp[role]'+resp['role']);
					if (resp['role'] === "type1") {
						alert('transitioning to PATIENT');
						that.transitionToRoute('patient');
					} else if (resp['role'] === "type2") {

						that.transitionToRoute('typetwo');
					} else {
						alert('SHIT!');
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
	},

	/*
	protectAuth: function(role) {
		var data = {};
		alert('role is: '+role);
		if (role) {
			data['role'] = role;
		}
		data['access_token'] = $.cookie('apitoken');
		Ember.$.get(EmberApp.URL_BASE+'/protect_auth', data).then(function(resp) {
			alert("RESP: "+resp);
			return;
		}, function(err) {
			return false;
		});	
	}
	*/



});