EmberApp.Question = DS.Model.extend({
	name: DS.attr('string'),
	answers: DS.hasMany('EmberApp.Answer'),
	//user: DS.belongsTo('EmberApp.User')
});


// Below only needed if using DS.FixturesAdapter, not needed when using DS.RESTAdapter 
/*
EmberApp.Question.FIXTURES = [
  	{ id: 1, name: 'Fixture Question1' }
];
*/