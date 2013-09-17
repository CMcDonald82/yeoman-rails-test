EmberApp.RegisterController = Ember.Controller.extend({

	//needs: 'application',

	//controllerBinding: 'controllers.application',

	register: function() {
		var data = {
			username: this.get('username'),
			password: this.get('password'),
			password_confirm: this.get('password_confirm'),
			email: this.get('email')
		};
		console.log(data);
		console.log('CSRF: '+Ember.$.cookie('csrftoken'));
		//console.log(controllers.content);
		EmberApp.Utils.getToken();
		Ember.$.post('/signup', data).then(function(response) {
			alert("Got a response: "+response);
		});
	}


});