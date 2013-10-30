
//EmberApp.IndexRoute = EmberApp.CheckAuthRoute.extend();

EmberApp.IndexRoute = Ember.Route.extend({

	beforeModel: function() {
		var lastFilter = this.controllerFor('register').get('lastFilter');
		alert('lastFilter: '+lastFilter);
		//this.transitionTo(lastFilter || this.checkAuth());
		this.checkAuth();
	},
	
	checkAuth: function() {
		var that = this;
		var data = {};
		data['access_token'] = $.cookie('apitoken');
		Ember.$.get(EmberApp.URL_BASE+'/check_auth', data).then(function(resp) {
			if (resp['msg'] === "SUCCESS") {
				if (resp['role'] === "type1") {
					alert('transitioning to PATIENT');
					that.transitionTo('patient');
				} else if (resp['role'] === "type2") {
					that.transitionTo('typetwo');
				} 
				
			} else {
				
				that.transitionTo('register');
			}
		}, function(err) {
			that.transitionTo('register');
		});
	}

});
