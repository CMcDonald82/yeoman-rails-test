EmberApp.PatientRoute = EmberApp.AuthenticatedRoute.extend({
	role: "type1",
	authorize: true,
	isIndex: false,

	/* Not needed, we set the model on the controllers in setupController below
	model: function() {
		return EmberApp.Question.find({'access_token': $.cookie('apitoken')});
	},
	*/


	// Gets user's questions from server
	setupController: function() {
		this.controllerFor('questions').set('model', EmberApp.Question.find({'access_token': $.cookie('apitoken')}));	
	}

});



//EmberApp.PatientRoute = Ember.Route.extend({
	
//	redirect: function() {
		
//		alert('protected redirect');
//		var ctrl = this.controllerFor('application');
//		ctrl.checkAuth('patient', "type1", true);

		/*
		var that = this;
		var data = {};
		data['access_token'] = $.cookie("apitoken");
		Ember.$.get(EmberApp.URL_BASE+'/check_auth', data).then(function(resp) {
			//if (resp['msg'] !== "SUCCESS" || resp['role'] !== "P") {
			//if (jqXHR.status === 401) {
			
			//if(err) {
			//	that.transitionTo('index');
			//}
		
		}, function(err) {
			that.transitionTo('index');
		});
		*/
//	}
//});
