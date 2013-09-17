EmberApp.Utils = Ember.Object.create({
	
	getToken: function() {
		alert('utils get token');
		//var data = {};
		/*
		Ember.$.get('http://localhost:3000/csrf', {}, function(data) { 
			alert('my response: '+data); 
		});//.then(function(response) {
		*/
			//console.log("Got a response: ");
		//});
	
		$.ajax({
			url: '/csrf',	
		}).done(function(resp) {
			alert('my response: '+resp);
		});
	}
});