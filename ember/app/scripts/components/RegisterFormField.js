EmberApp.RegisterFormFieldComponent = Ember.Component.extend({

	//controller: EmberApp.RegisterController,

	/*
	unameVal: function() {
		return this.get('controller.uname');
	}.observes('controller.uname'),
	*/
	
  	keyUp: function() {
  		console.log('KEY PRESSED');
  		//alert(this.get('valid')); // works
  		var that = this;
  		var data = {
  			type: this.get('kind'),
  			value: this.get('val')
  		};
  		console.log('kind: '+this.get('kind'));
  		console.log('value: '+this.get('val')); //this.get('controller.uname'));
		console.log('value: '+this.get('name'));

		


  		/*
  		EmberApp.Utils.getToken(function() {
			data['authenticity_token'] = EmberApp.CSRF_TOKEN;
			
			if (EmberApp.PRODUCTION_SETTINGS === true) {
				EmberApp.Utils.setupAjax();
			}
		*/


		// Check to see if the form is in register mode (i.e. 'isRegister' is true), if so, make call to server for field validation.
		// 	Otherwise, form is in login mode and no need to validate on keyup, just validate when username & pw are sent to server for auth check 
		if (that.outer.isRegister) {
			//EmberApp.Utils.setupAjaxForApiToken(); // When using headers to send token to server
			//alert("EmberApp.API_TOKEN IS: "+EmberApp.API_TOKEN);
			data['access_token'] = EmberApp.API_TOKEN;
			Ember.$.get(EmberApp.URL_BASE+'/validateRegField', data).then(function(resp) {
				//alert("Got a response: "+response);
				if (resp.msg) {
					that.set('errorMessage', resp.msg);
				} else {
					if (that.get('name') === "pass-confirm") {
						console.log('SENDING PASS-CONFIRM ACTION');
						that.outer.send('validatePassConfirm', that);
					} else {
					
						that.set('errorMessage', '');
					}
				}
			});
		}
		//});

		

  		
  	}

	

	/*
	actions: {
		// Normally (per the Ember Docs) you would put your actions here but the latest version of Ember
		// doesn't work that way. Just define actions on their own, as done above. It seems as though the docs 
		// have not been updated to reflect this	
	}
	*/

});