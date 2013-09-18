EmberApp.RegisterController = Ember.Controller.extend({

	//needs: 'application',

	//controllerBinding: 'controllers.application',

	register: function() {
		var data = {
			username: this.get('username'),
			password: this.get('password'),
			password_confirm: this.get('password_confirm'),
			email: this.get('email'),

		};
		console.log(data);
		console.log('CSRF: '+Ember.$.cookie('csrftoken'));
		//console.log(controllers.content);
		EmberApp.Utils.getToken(function() {
			data['authenticity_token'] = EmberApp.CSRF_TOKEN;
			//data['request_forgery_protection_token'] = EmberApp.CSRF_TOKEN;
			//data['request_forgery_protection_token'] = EmberApp.CSRF_TOKEN;

			//console.log("PRODUCTION_SETTINGS: "+EmberApp.PRODUCTION_SETTINGS);
			if (EmberApp.PRODUCTION_SETTINGS === true) {
				EmberApp.Utils.setupAjax();
			}
			console.log('EmberApp.URL_BASE: '+EmberApp.URL_BASE);
			Ember.$.post(EmberApp.URL_BASE+'/signup', data).then(function(response) {
				alert("Got a response: "+response);
			});
		});
		
		



		/*
		$.ajax({
			type: 'POST',
			url: EmberApp.URL_BASE+'/signup',	
			crossDomain: EmberApp.CROSS_DOMAIN,
			headers: {'X-CSRF-TOKEN': EmberApp.CSRF_TOKEN}
		}).done(function(resp) {
			alert('THE RESPONSE: '+resp);
		});	
		*/

			
		
		
	}


});