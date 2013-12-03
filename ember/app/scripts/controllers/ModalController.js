EmberApp.ModalController = Ember.Controller.extend({
    needs: ['application', 'register'],

  	countdown: EmberApp.TIME_UNTIL_EXPIRATION,

  	callAuthPoll: function() {
    		//alert("DOESNT WORK");
    		var appController = this.get('controllers.application');		
  		  appController.authPoller();
  	},

  	/*
  	callLogout: function() {
		var regController = this.get('controllers.register');		
		regController.logout();
  	},

  	goToRegister: function() {
  		this.transitionToRoute('register');
  	},
  	*/


    /*
        Function used to log the user out and redirect to /register. Called when timeout popup's 'Close' button is clicked or when its timer runs out
    */
  	logoutAndRedirect: function() {
    		clearInterval(EmberApp.EXPIRATION_INTERVAL);
    		EmberApp.EXPIRATION_INTERVAL = null;
    		var regController = this.get('controllers.register');		
    		regController.logout();
    		this.transitionToRoute('register');
  	}

});