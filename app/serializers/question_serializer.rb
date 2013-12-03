class QuestionSerializer < ActiveModel::Serializer
	embed :ids, include: true
	attributes 	:id, :name

	
	# NOTE: The key: below should be changed from :answer_ids to :answers if upgrading to new version of EmberData (since EmberData now expects the key for hasMany relationships to just be the plural name of the related model, without the _ids suffix) 
	has_many :answers, key: :answer_ids #, embed: :objects
	#has_one :user
end