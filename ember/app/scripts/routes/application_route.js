EmberApp.ApplicationRoute = Ember.Route.extend({
    
	events: {
		open: function() {
	      	this.render('modal', {into: "application", outlet: "modal"});
	      	//this.controllerFor('modal').set('countdown', 0);
	    },

	    openRegisterSuccess: function() {
	    	//alert("WHAT");
	    	this.render('register_success_modal', {into: "application", outlet: "modal"});
	    },

	    close: function() {
	    	//alert("WHAT");
	      	this.render('nothing', {into: "application", outlet: "modal"});
	    }

	    //fill: function() {
	    //	$("#ticker").html(EmberApp.TIME_UNTIL_EXPIRATION);
	    //}
	},

    // admittedly, this should be in IndexRoute and not in the
    // top level ApplicationRoute; we're in transition... :-)
    model: function () {
        return ['red', 'yellow', 'blue'];
    }

    
    
	
});
