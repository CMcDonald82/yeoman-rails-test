EmberApp.AuthenticatedRoute = Ember.Route.extend({

	authorized: true,

  	
	beforeModel: function(transition) {
		//alert('role: '+this.role);
		//var appController = this.controllerFor('application');
		//if (!this.protectAuth(this.role, transition)) {
        //		alert('non-empty form!');
       	//		transition.abort();
      	//};

      	//var promise = this.protectAuth(this.role, transition);
      	//promise.then(transition.retry(), transition.abort());
		
      	// Call for old method
		//this.protectAuth(this.role, transition);

		// Call for new method
		this.protectAuthRewrite(transition, this.role, this.authorize, this.isIndex);
	},
	

	// New, refactored version of protectAuth
	protectAuthRewrite: function(trans, role, authorize, isIndex) {
		var that = this;
		var data = {};
		if (role) {
			data['role'] = role;
		}
		if (authorize) {
			data['authorize'] = true;
		}
		data['access_token'] = $.cookie('apitoken');


		EmberApp.Utils.setupRefactored('GET', '/client_redirect_auth', data, function(resp) {
			var loginController = that.controllerFor('register');	
			var appController = that.controllerFor('application');		
			appController.authPoller();
			if (resp['msg'] === "UNAUTHORIZED") {
				alert("NOT AUTH: "+trans);
				var next = loginController.get('previousTransition');
				console.log(next);
				if (next) {
					next.retry();
				} else {
					that.transitionTo('index');
				}
			} else {
				loginController.set('previousTransition', trans);
			}

			if (isIndex) {
				if (resp['role'] === "type1") {
					//alert('transitioning to PATIENT');
					that.transitionTo('patient');
				} else if (resp['role'] === "type2") {
					that.transitionTo('typetwo');
				} 
			}
		}, function(err) {
			// User is not logged in (not authenticated)
			alert("STOP");
			that.transitionTo('register');
		});

		/*
		Ember.$.get(EmberApp.URL_BASE+'/client_redirect_auth', data).then(function(resp) {
			
			var loginController = that.controllerFor('register');			
			if (resp['msg'] === "UNAUTHORIZED") {
				alert("NOT AUTH: "+trans);
				var next = loginController.get('previousTransition');
				console.log(next);
				if (next) {
					next.retry();
				} else {
					that.transitionTo('index');
				}
			} else {
				loginController.set('previousTransition', trans);
			}

			if (isIndex) {
				if (resp['role'] === "type1") {
					alert('transitioning to PATIENT');
					that.transitionTo('patient');
				} else if (resp['role'] === "type2") {
					that.transitionTo('typetwo');
				} 
			}

		}, function(err) {
			// User is not logged in (not authenticated)
			alert("STOP");
			that.transitionTo('register');
		});	
		*/

	},


	protectAuth: function(role, trans) {
		var that = this;
		var data = {};
		var tr = trans;
		//trans.abort();
		//alert('role is: '+role);
		
		// - 
		
		if (role) {
			data['role'] = role;
		}
		data['access_token'] = $.cookie('apitoken');
		Ember.$.get(EmberApp.URL_BASE+'/protect_auth', data).then(function(resp) {
			//alert("RESP: "+resp);
			/*
			if (resp['msg'] !== "AUTHORIZED") {
				alert("NOT PASSED");
				that.controllerFor('register').set('previousTransition', transition);
				that.transitionTo('register');
			} else if
			*/
			var loginController = that.controllerFor('register');
			
			if (resp['msg'] === "UNAUTHORIZED") {
				alert("NOT AUTH: "+trans);
				//var next = ap.get('currentPath');
				//alert("NEXT: "+next);
				//that.transitionTo(next);
				//cb();
				
				//that.authorized = false;
				//return null;
				//return "BULL";
				//cb(trans);

				//that.transitionTo('index');
				var next = loginController.get('previousTransition');
				//alert(next);
				next.retry();
			} else {
				// User is logged in but not 
				//var loginController = that.controllerFor('register');
				loginController.set('previousTransition', trans);
			}
			//return;


		}, function(err) {
			// User is not logged in (not authenticated)
			alert("STOP");
			that.transitionTo('register');
		});	
	}


});