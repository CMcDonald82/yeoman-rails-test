EmberApp.Answer = DS.Model.extend({
	value: DS.attr('number'),
	question: DS.belongsTo('EmberApp.Question')
});