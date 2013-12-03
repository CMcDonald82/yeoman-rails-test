EmberApp.Store = DS.Store.extend({

	// Use the fixture adapter when testing locally and before hooking up to the server (even though server can be accessed locally)
    //adapter: DS.FixtureAdapter.create()
    

    adapter: DS.RESTAdapter.create({
    	
    	revision: 13,
    	// Comment out the 'url' param below for production. In production, we want the url to be the same as the Ember app's so no need to specify the param here 
    	url: EmberApp.URL_BASE, //"http://localhost:3000"
        //beforeSend: function(xhr) { xhr.setRequestHeader('X-API-TOKEN', EmberApp.API_TOKEN); xhr.setRequestHeader('X-CSRF-TOKEN', EmberApp.CSRF_TOKEN) }
        //data: {'access_token': $.cookie('apitoken')}
        //serializer: DS.Serializer.create({})
  	})
	
});

/*
EmberApp.Store.adapter.serializer.map('EmberApp.Question', {
    answers: {embedded: 'load'}
});
*/



/*
DS.RESTAdapter.reopen({
	host: 'http://localhost:3000'
});
*/