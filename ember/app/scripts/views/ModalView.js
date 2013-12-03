EmberApp.ModalView = Ember.View.extend({
	
	didInsertElement: function() {
    	this.$('.modal, .modal-backdrop').addClass('in');
    	$("#ticker").html(EmberApp.TIME_UNTIL_EXPIRATION);
  	},

	layoutName: 'modal_layout',

	close: function() {
    	var view = this;
    	// use one of: transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd
    	// events so the handler is only fired once in your browser
    	this.$('.modal').one("transitionend", function(ev) {
      		view.get('controller').send('close');
    	});
    
    	this.$('.modal, .modal-backdrop').removeClass('in');
  	},

  	continue: function() {
		//console.log($.toJSON(this.get('controller')));
		var that = this;
		var data = {};
		//that.send('close');
		data['access_token'] = $.cookie('apitoken');
		that.close();
		EmberApp.Utils.setupRefactored('GET', '/client_redirect_auth', data, function(resp) {
			clearInterval(EmberApp.EXPIRATION_INTERVAL);
			EmberApp.EXPIRATION_INTERVAL = null;
			//alert("STUPID");
			that.get('controller').send("callAuthPoll");
			
		}, function(err) { 
			console.log("INTERVAL ERR "+JSON.stringify(err));
			that.transitionToRoute('register');
		});
	},

	decline: function() {
		//clearInterval(EmberApp.EXPIRATION_INTERVAL);
		//EmberApp.EXPIRATION_INTERVAL = null;
		//this.get('controller').send("callLogout");
		this.get('controller').send("logoutAndRedirect");
		this.close();
		//this.get('controller').send("goToRegister");
		
	},

	regsuccess: function() {
		//alert("regsuccess: "+this.get('controller'));
		this.get('controller').send("redirectToUserRoute"); // sends to RegisterSuccessModalController (since that's the controller associated with the register_success_modal template), rather than ModalController
		//this.close();
	}


});