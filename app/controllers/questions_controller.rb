class QuestionsController < ApplicationController
  	
    # Uncomment the below line once code is a bit more stable
  	#before_filter :only => [:index] do authorize("type1") end

    # Get all questions for specific user - TODO: restrict access here to only questions associated with current user
  	def index
  		render json: Question.all()
  	end

    # TODO: Only return the json if the question belongs to the current user
  	def show
  		question = Question.find(params[:id])
  		puts "QUESTION: #{question.name}"
  		render json: question
  	end

end
