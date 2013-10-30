EmberApp.AuthenticatedRoute = Ember.Route.extend({

	

	beforeModel: function(transition) {
		//alert('role: '+this.role);
		this.protectAuth(this.role);
		//if (!this.controllerFor('application').protectAuth(this.role)) {
			
		//}
	},


	protectAuth: function(role) {
		var that = this;
		var data = {};
		//alert('role is: '+role);
		if (role) {
			data['role'] = role;
		}
		data['access_token'] = $.cookie('apitoken');
		Ember.$.get(EmberApp.URL_BASE+'/protect_auth', data).then(function(resp) {
			alert("RESP: "+resp);
			if (resp['msg'] !== "AUTHORIZED") {
				alert("NOT PASSED");
				that.controllerFor('register').set('previousTransition', transition);
				that.transitionTo('register');
			}
			//return;
		}, function(err) {
			//return false;
			alert("STOP");
			that.transitionTo('register');
		});	
	}


});