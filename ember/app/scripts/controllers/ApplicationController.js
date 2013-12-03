EmberApp.ApplicationController = Ember.ArrayController.extend({
	
	needs: ['register', 'modal'],
	

	init: function() {
		//console.log('CSRF APP: '+Ember.$.cookie('csrftoken'));
		//this.authPoller();
	},

	

	/*
		This function is called when the user logs in. It starts the polling mechanism for periodically
		checking the auth status of the user. If the auth status comes back as not logged in (the user's
		signin period has expired), the user will be logged out.
	*/
	authPoller: function() {
		var that = this;
		var data = {};
		data['access_token'] = $.cookie('apitoken');
		data['is_poll'] = true;
		clearInterval(EmberApp.AUTH_POLL_INTERVAL);
		
		//EmberApp.EXPIRATION_INTERVAL = null;

		EmberApp.AUTH_POLL_INTERVAL = setInterval(function() {
			EmberApp.Utils.setupRefactored('GET', '/client_redirect_auth', data, function(resp) {
				console.log("timeUntilExp: "+resp['timeUntilExp']);
				/*
				if (resp['msg'] === "UNAUTHORIZED") {
					EmberApp.Utils.setupRefactored('POST', '/signout', data, function() {
						alert("signed out...");
					});
				}
				*/
				if (resp['timeUntilExp'] <= 270) {
					if (!EmberApp.EXPIRATION_INTERVAL) {
						EmberApp.TIME_UNTIL_EXPIRATION = resp['timeUntilExp'];
						// EmberApp.EXPIRATION_INTERVAL doesn't exist yet - create it
						that.expirationWarningPoller();
					}
				}
			}, function(err) { 
				console.log("INTERVAL ERR "+JSON.stringify(err));
				that.transitionToRoute('register');
			});
		}, 10000);

		
		/*
		EmberApp.EXPIRATION_INTERVAL = setInterval(function() {
			EmberApp.TIME_UNTIL_EXPIRATION -= 1;
			console.log("EmberApp.TIME_UNTIL_EXPIRATION: "+EmberApp.TIME_UNTIL_EXPIRATION);
			if (EmberApp.TIME_UNTIL_EXPIRATION === 5) {
				// Show the dialog box to confirm session extension
				//$("#myModal").modal('show');
				that.send('open');
			} else if (EmberApp.TIME_UNTIL_EXPIRATION < 5) {
				// Set the value of the element that displays the countdown in dialog box to current value of EmberApp.TIME_UNTIL_EXPIRATION
				$("#ticker").html(EmberApp.TIME_UNTIL_EXPIRATION);
			}
		}, 1000);
		*/
		
	},

	expirationWarningPoller: function() {
		var that = this;
		
		
		EmberApp.EXPIRATION_INTERVAL = setInterval(function() {
			EmberApp.TIME_UNTIL_EXPIRATION -= 1;
			console.log("EmberApp.TIME_UNTIL_EXPIRATION: "+EmberApp.TIME_UNTIL_EXPIRATION);
			//if (EmberApp.TIME_UNTIL_EXPIRATION === ) {
				// Show the dialog box to confirm session extension
				//$("#myModal").modal('show');
			
			//if (EmberApp.TIME_UNTIL_EXPIRATION < 290) {
				// Set the value of the element that displays the countdown in dialog box to current value of EmberApp.TIME_UNTIL_EXPIRATION
			
			if (EmberApp.TIME_UNTIL_EXPIRATION === 260) {
				that.send('close');
				var modalController = that.get('controllers.modal');		
				modalController.logoutAndRedirect();
				
			} else {
				$("#ticker").html(EmberApp.TIME_UNTIL_EXPIRATION);
			}
			//}
		}, 1000);
		that.send('open');

	},

	teardownAuthPoller: function() {
		clearInterval(EmberApp.AUTH_POLL_INTERVAL);
		clearInterval(EmberApp.EXPIRATION_INTERVAL);
		EmberApp.AUTH_POLL_INTERVAL = null;
		EmberApp.EXPIRATION_INTERVAL = null;
	}

	/*
	updateCurrentPath: function() {
        EmberApp.set('currentPath', this.get('currentPath'));
    }.observes('currentPath'),

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