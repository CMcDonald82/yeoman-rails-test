EmberApp.RegisterRoute = Ember.Route.extend({
	
	/*
		Unless this is here, if you try logging in with wrong uname/pw combo, the error msg will display,
		then if you login successfully, and return to the 'register' page, the error message will still be there
	*/
	beforeModel: function() {
		this.controllerFor('register').set('loginError', false);

		this.controllerFor('usertype').set('isType1', false);
		this.controllerFor('usertype').set('isType2', false);
		var that = this;
		var data = {};
		data['access_token'] = $.cookie('apitoken');
		// Check whether user is authenticated and if so, what role they are. Depending on results, switch the 'isType1' & 'isType2' properties of the UsertypeController on/off to toggle display of appropriate messages on register page
		EmberApp.Utils.setupRefactored('GET', '/check_auth', data, function(resp) {
			
			if (resp['msg'] === "SUCCESS") {
				if (resp['role'] === "type1") {
					that.controllerFor('usertype').set('isType1', true);
				} else if (resp['role'] === "type2") {
					that.controllerFor('usertype').set('isType2', true);
				}
			}		
		}, function(err) {
			console.log("An error occurred - user is not logged in: "+err);
		});
	},

	setupController: function() {
		this.controllerFor('questions').set('model', EmberApp.Question.find({'access_token': $.cookie('apitoken')}));
		
	},



});