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


  		/*
  		EmberApp.Utils.getToken(function() {
			data['authenticity_token'] = EmberApp.CSRF_TOKEN;
			
			if (EmberApp.PRODUCTION_SETTINGS === true) {
				EmberApp.Utils.setupAjax();
			}
		*/
			Ember.$.get(EmberApp.URL_BASE+'/validateRegField', data).then(function(resp) {
				//alert("Got a response: "+response);
				if (resp.msg) {
					that.set('errorMessage', resp.msg);
				} else {
					that.set('errorMessage', '');
				}
			});
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