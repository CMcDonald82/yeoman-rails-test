class AnswersController < ApplicationController
  	
  	def show
  	end

  	# Create new answer - will need the question this answer will be associated with, and also restrict access to logged in users who have that question associated with them
  	def create 
  		puts "ANSWER PARAMS: #{params}"
  	end
end
