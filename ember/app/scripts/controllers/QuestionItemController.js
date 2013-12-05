EmberApp.QuestionItemController = Ember.ObjectController.extend({
	
	addAnswer: function() {
		// alerts the name of the question - we have access to the question that the newly created anser will be associated with
		
		// Create Answer object and send to server
		var val = this.get('newAnswer').trim();
		alert("ADDING... "+this.get('model').get('name')+"   "+val);
		if (!val) {
			return;
		}
		var q = this.get('model');
		var ans = EmberApp.Answer.createRecord(
			value: val,
			question: q
		);
		ans.save();
	}
});