EmberApp.RegisterController = Ember.Controller.extend({

	//needs: 'application',

	//controllerBinding: 'controllers.application',

	isRegister: false,
	submitButtonVal: "Login",
	isSelected: "type1",
	lastFilter: '',
	//previousTransition: null,

	init: function() {
		console.log("init");
		// Try putting CSRF token logic here
		
		
		EmberApp.Utils.getToken(function() {
			//data['authenticity_token'] = EmberApp.CSRF_TOKEN;
			
			//if (EmberApp.PRODUCTION_SETTINGS === true) {
			//	EmberApp.Utils.setupAjax();
			//}
			//console.log('EmberApp.URL_BASE: '+EmberApp.URL_BASE);
			
		});
		
	},


	//formAct: "login",

	register: function() {
		var data = {
			name: this.get('username'),
			password: this.get('password'),
			password_confirmation: this.get('password_confirm'),
			email: this.get('email'),
			role: this.isSelected
		};
		var that = this;
		//this.uname = this.get('username');
		console.log('username in controller: '+this.get('username'));
		console.log(data);
		console.log('CSRF: '+Ember.$.cookie('csrftoken'));
		//console.log(controllers.content);
		
		
		Ember.$.post(EmberApp.URL_BASE+'/signup', data).then(function(response) {
				//alert("Got a response: "+response);
				if (response['msg'] === "SUCCESS") {
					alert('User saved to db');
				} else {
					alert('ERRORS: '+response['msg']);
					// TODO: put similar logic here as in the RegisterFormField component to handle dispaying error msgs if any
					that.set('errorMessages', response['msg']);
				}
				
			});
		
		
		/*
		EmberApp.Utils.getToken(function() {
			data['authenticity_token'] = EmberApp.CSRF_TOKEN;
			
			if (EmberApp.PRODUCTION_SETTINGS === true) {
				EmberApp.Utils.setupAjax();
			}
			console.log('EmberApp.URL_BASE: '+EmberApp.URL_BASE);
			Ember.$.post(EmberApp.URL_BASE+'/signup', data).then(function(response) {
				alert("Got a response: "+response);
				if (response['msg'] === "SUCCESS") {
					alert('User saved to db');
				} else {
					alert('ERRORS: '+response['msg']);
					// TODO: put similar logic here as in the RegisterFormField component to handle dispaying error msgs if any
					that.set('errorMessages', response['msg']);
				}
				
			});
		});
		*/

		
	},

	
	validatePassConfirm: function(doof) {
		console.log('got password_confirm action from component');
		if (this.get('password_confirm') !== this.get('password')) {
			//alert('CRAP!!!');
			doof.set('errorMessage', 'password fields must match');
		} else {
			doof.set('errorMessage', '');
		}
	},


	toggleReg: function() {
		this.toggleProperty('isRegister');	
		this.set('formAction', 'reg');
		this.set('submitButtonVal', 'Register');
	},

	login: function() {
		// Make call to /login on server to perform validation & auth. If user is authenticated, redirect to appropriate
		// section of app (patient or dr). If not authenticated & authorized, call toggleReg() to proceed to registration step
		console.log('LOGGING IN...');
		console.log('isRegister: '+this.get('isRegister'));
		var data = {
			name: this.get('username'),
			password: this.get('password'),
			xsrf: EmberApp.CSRF_TOKEN
		};
		var that = this;
		//data['request_forgery_protection_token'] = EmberApp.CSRF_TOKEN;
		//data['authenticity_token'] = EmberApp.CSRF_TOKEN;

		
		//EmberApp.Utils.setupAjax();
		Ember.$.post(EmberApp.URL_BASE+'/signin', data).then(function(resp) {

			if (resp['msg'] === "REGISTER") {
				alert('Transfer to register');
				that.toggleReg();
			} else if (resp['msg'] === "SUCCESS") {
				// Set EmberApp.API_TOKEN and a cookie equal to the value of the returned API token.
				// With each request, the function making the request will get the token from the cookie and set EmberApp.API_TOKEN
				//	equal to that value. EmberApp.API_TOKEN will then be passed to server in params
				EmberApp.API_TOKEN = resp['token'];
				$.cookie("apitoken", resp['token']);
				alert("SUCCESS - SET API TOKEN TO: "+EmberApp.API_TOKEN);
				//that.toggleReg();
				
				// Might no longer be needed, see if the 'lastFilter' stuff is still used anywhere
				if (resp['role'] === "type1") {
					that.set('lastFilter', 'patient');
				} else {
					that.set('lastFilter', 'typetwo');
				}

				// See if there was a previousTransition (protected url that user tried to access but couldn't since they were not logged in)
				//	If so, redirect to that, if not, user needs to be redirected according to the rules in the IndexRoute
				var previousTransition = that.get('previousTransition');
				if (previousTransition) {
					that.set('previousTransition', null);
					previousTransition.retry();
				} else {
					alert("TRANSITIONIN");
					that.transitionToRoute('index');
				}
			} else {
				alert("ERROR");
				that.set('loginError', resp['msg']);
			}
		});
		
		
	},

	logout: function() {
		var that = this;
		var data = {};
		data['access_token'] = $.cookie("apitoken");
		//data['xsrf'] = EmberApp.CSRF_TOKEN;
		EmberApp.Utils.setupRefactored('POST', '/signout');
		/*
		Ember.$.post(EmberApp.URL_BASE+'/signout', data).then(function(resp) {
			alert('logged out');
			that.set('lastFilter', '');
		});
		*/
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
			
			this.register();
		} else {
			console.log('calling login');
			
			this.login();

		}
		
	}



});