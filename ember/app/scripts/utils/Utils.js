EmberApp.Utils = Ember.Object.create({
	
	getToken: function(callback) {
		//alert('utils get token');
		//var data = {};
		/*
		Ember.$.get('http://localhost:3000/csrf', {}, function(data) { 
			alert('my response: '+data); 
		});//.then(function(response) {
		*/
			//console.log("Got a response: ");
		//});
	
		$.ajax({
			url: EmberApp.URL_BASE+'/csrf',	
			crossDomain: EmberApp.CROSS_DOMAIN,
			//contentType: "application/json",
			
			/*
			// Changing/creating custom headers causes a 404 on cross-domain requests
			headers: {
				"X-CSRF-Token": EmberApp.CSRF_TOKEN
			}
			*/

		}).done(function(resp) {
			alert(resp['csrf_token']);
			EmberApp.CSRF_TOKEN = resp['csrf_token'];
			//$('meta[name="csrf-token"]').attr('content', resp['csrf_token']);
			//$('meta[name="csrf-param"]').attr('content', resp['req_forgery_token']);
			
			// Doesn't look like this line is needed, try on Heroku, see if it works without it
			// This line will insert the CSRF_TOKEN in the hidden form field that has name="authenticity_token"
			//$('[name="authenticity_token"]').val(EmberApp.CSRF_TOKEN);
			
			// Doesn't look like this line is needed, try on Heroku, see if it works without it
			//$.cookie("csrftoken", resp['csrf_token']);
			

			callback();
			/*
			$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
  				// Modify options, control originalOptions, store jqXHR, etc
  				jqXHR.setRequestHeader('X-CSRF-Token', resp);
			});
*/
		});
	},


	setupAjax: function() {
		$.ajaxSetup({
  			beforeSend: function(jqXHR) {
  				// If using headers for sending CSRF token to server
    			jqXHR.setRequestHeader('X-CSRF-Token', EmberApp.CSRF_TOKEN);
  			}
		});

		/*
		$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
  			// Modify options, control originalOptions, store jqXHR, etc
  			jqXHR.setRequestHeader('X-CSRF-Token', EmberApp.CSRF_TOKEN);
		});
		*/
	},

	// Refactor along with above setupAjax method into single method for setting up AJAX requests for CSRF & API token
	setupAjaxForApiToken: function() {
		$.ajaxSetup({
  			beforeSend: function(jqXHR) {
    			jqXHR.setRequestHeader('Authorization', "Token token="+EmberApp.API_TOKEN);
  			}
		});
	}
});