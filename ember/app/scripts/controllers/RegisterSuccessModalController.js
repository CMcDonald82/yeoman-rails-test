EmberApp.RegisterSuccessModalController = Ember.Controller.extend({

    needs: ['application', 'register'],

    redirectToUserRoute: function() {
        alert("redirectToUserRoute called");    
        var that = this;
        var appController = that.get('controllers.application');
        appController.authPoller();
        var regController = that.get('controllers.register');
        appController.send('close');
        

        // See if there was a previousTransition (protected url that user tried to access but couldn't since they were not logged in)
        //  If so, redirect to that, if not, user needs to be redirected according to the rules in the IndexRoute
        var previousTransition = regController.get('previousTransition');
        if (previousTransition) {
          regController.set('previousTransition', null);
          previousTransition.retry();
        } else {
          alert("TRANSITIONIN");
          that.transitionToRoute('index');
        }
    }
});

