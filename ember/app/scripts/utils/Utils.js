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
			
			
			// Doesn't look like this line is needed, try on Heroku, see if it works without it
			// This line will insert the CSRF_TOKEN in the hidden form field that has name="authenticity_token"
			//$('[name="authenticity_token"]').val(EmberApp.CSRF_TOKEN);
			
			// Doesn't look like this line is needed, try on Heroku, see if it works without it
			//$.cookie("csrftoken", resp['csrf_token']);
			

			//callback();
			
			
		});
	},


	setupAjax: function() {
		$.ajaxSetup({
  			beforeSend: function(jqXHR) {
  				// If using headers for sending CSRF token to server
    			jqXHR.setRequestHeader('X-CSRF-TOKEN', EmberApp.CSRF_TOKEN);
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
	},


	setupRefactored: function(type, url, data, successCallback, errorCallback) {
		console.log("CALLING setupRefactored");
		console.log("TOKEN: "+data.access_token);
		console.log("data[is_poll]: "+data.is_poll);
		var setAjaxHeader = null;
		if (!data.is_poll) {
			console.log("NOT POLLING - RESETTING TICKER");
			EmberApp.TIME_UNTIL_EXPIRATION = 300;
		}
		if (EmberApp.PRODUCTION_SETTINGS) {
			setAjaxHeader = function(xhr) { xhr.setRequestHeader('X-CSRF-TOKEN', EmberApp.CSRF_TOKEN) };
		}
		$.ajax({
			type: type,
			crossDomain: EmberApp.CROSS_DOMAIN,
			url: EmberApp.URL_BASE+url,
			data: data,
			beforeSend: setAjaxHeader, //function(xhr) { xhr.setRequestHeader('X-CSRF-TOKEN', EmberApp.CSRF_TOKEN) },
			success: function(responseData, textStatus, jqXHR) {
				//alert("in "+JSON.stringify(responseData));
				
				successCallback(responseData);
			},
			error: function(responseData, textStatus, errorThrown) {
				//alert("POST failed");
				// 401
				console.log("ERROR RESP DATA: "+JSON.stringify(responseData));
				console.log("ERROR DATA THROWN: "+JSON.stringify(errorThrown));

				errorCallback(responseData);
				//successFunc(responseData);
			}
		});
	},


	/*
		This function is called when the user logs in. It starts the polling mechanism for periodically
		checking the auth status of the user. If the auth status comes back as not logged in (the user's
		signin period has expired), the user will be logged out.
	*/
	/*
	authPoller: function() {
		alert("setting up authPoller");
		var data = {};
		var that = this;
		data['access_token'] = $.cookie('apitoken');
		//EmberApp.AUTH_POLL_INTERVAL = setInterval(function() {console.log("INTERVAL");}, 5000);
		
		EmberApp.AUTH_POLL_INTERVAL = setInterval(function() {that.setupRefactored('GET', '/client_redirect_auth', data, function(resp) {
			if (resp['msg'] === "UNAUTHORIZED") {
				that.setupRefactored('POST', '/signout', data, function() {
					alert("signed out...");
				});
			}
		});}, 5000);
		
	}
	*/



});