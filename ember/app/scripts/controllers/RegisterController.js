EmberApp.RegisterController = Ember.Controller.extend({

	//needs: 'application',

	//controllerBinding: 'controllers.application',

	isRegister: false,
	submitButtonVal: "Login",

	

	//formAct: "login",

	register: function() {
		var data = {
			username: this.get('username'),
			password: this.get('password'),
			password_confirm: this.get('password_confirm'),
			email: this.get('email'),

		};
		//this.uname = this.get('username');
		console.log('username in controller: '+this.get('username'));
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
	},

	/*
	hello: function(name) {
		alert("Hello "+name);
	},
	*/

	toggleReg: function() {
		this.toggleProperty('isRegister');
		this.set('submitButtonVal', 'Register');
		this.set('formAction', 'reg');
	},

	login: function() {
		// Make call to /login on server to perform validation & auth. If user is authenticated, redirect to appropriate
		// section of app (patient or dr). If not authenticated & authorized, call toggleReg() to proceed to registration step
		console.log('LOGGING IN...');
		console.log('isRegister: '+this.get('isRegister'));
		this.toggleReg();
	},

	// Temp method placeholder for the above 'register' method until the ember app flow is worked out and server-side
	// is built out. Then, we can replace the call to this 'reg' method with a call to 'register'
	reg: function() {
		console.log('REGISTERING NEW USER...');
	},

	// Determines which auth method to call ('login' or 'register') based on the value of the isRegister property
	auth: function() {
		if (this.get('isRegister')) {
			console.log('calling register');

		} else {
			console.log('calling login');
			
		}
		this.login();
	}



});