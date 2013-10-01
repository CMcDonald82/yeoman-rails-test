class SessionsController < ApplicationController

	def create
		puts "PARAMS: #{params}"
		
		msg = ''

		
		
		if params[:username]
			user = User.find_by(name: params[:username].downcase)
		end
		


		if user && user.authenticate(params[:password])
			# Sign user in & send a message to client to redirect to proper page depending on user role
			sign_in user
			msg = "SUCCESS"
		elsif user
			# Send message to client that username/pw combo was wrong and to try again
			msg = "Username/password combination invalid"
		else
			# Create error message and send to client to redirect to register form 
			msg = "REGISTER"
		end

		respond_to do |format|
    		format.json  { render :json => { :msg => msg } }   		
  		end
	end

	def destroy
	end

end
