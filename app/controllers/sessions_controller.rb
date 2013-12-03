class SessionsController < ApplicationController

	include ActionView::Helpers::DateHelper

	before_action :restrict_access, only: [:check_auth, :protect_auth, :client_redirect_auth]

	before_filter :reset_api_token_expiration, only: [:client_redirect_auth]

	#before_action(:only => [:destroy]) { |c| c.authorize "type1" } #:authorize, only: [:destroy]
	#before_filter :only => [:destroy] do authorize("type1") end

	# This is for signing in using traditional session-based approach. Session approach does not seem to fit as 
	# 	well with cient-side SPA accessing Rails app as an API
	def create
		puts "PARAMS: #{params}"
		
		msg = ''
		role = ''

		puts "verified_request? #{verified_request?}"
		puts "form_authenticity_token: #{form_authenticity_token}"
		puts "session[:_csrf_token]: #{session[:_csrf_token]}"
		#req_token = params[:request_]
		puts "params[request_forgery_protection_token]: #{params[:request_forgery_protection_token]}"
		
		if params[:name]
			user = User.find_by(name: params[:name].downcase)
			puts "USER: #{user}"
		end
		


		if user && user.authenticate(params[:password])
			# Sign user in & send a message to client to redirect to proper page depending on user role
			puts "SIGNING IN"
			# sign_in doesn't exist yet - write it (see section 8.2 of Rails tutorial)
			session[:current_user_id] = user.id
			#sign_in user 

			api_token = ApiKey.create(
				user_id: user.id,
				expires_at: 5.minutes.from_now
			)
			msg = "SUCCESS"
			token = api_token.access_token
			role = user.role
			puts "API TOKEN CREATED FOR USER: #{api_token.user_id}"
			puts "SENDING ACCESS TOKEN: #{token}"
		elsif user
			# Send message to client that username/pw combo was wrong and to try again
			puts "INVALID USERNAME/PW"
			msg = "Username/password combination invalid"
		else
			# Create error message and send to client to redirect to register form 
			puts "REDIRECT TO REGISTER"
			msg = "REGISTER"
		end

		respond_to do |format|
    		format.json  { render :json => { :msg => msg, :token => token, :role => role } }   		
  		end
	end

	def destroy
		#sign_out
		# Using token-based auth
		api_key = ApiKey.find_by_access_token(params[:access_token])
		api_key.destroy
		msg = "LOGGEDOUT"
		respond_to do |format|
    		format.json  { render :json => { :msg => msg } }   		
  		end
	end


	# Dummy function to check user's auth status. Will only be called if API Token exists, and will return user's role so client
	# 	will know where to redirect to

	# 3 Scenarios:
	# => Protected client-side url (known role)
	# 		Need to check that valid API token exists & that role of user on server matches the role of the client-side url being accessed. These URLs are used for client-side navigation	
	# => Protected server-side url (known role) 
	# 		Need to check that valid API token exists & that role of user on server matches the role of the server-side url being accessed. These URLs are used for getting/posting data to/from server	
	# => Protected url, unknown role	
	# 		Need to check that valid API token exists, and return the role of the user and a success message so that client knows where to redirect to. Used on login, where user obtains valid API token and then the client receives the role in the response and redirects based on that
	def check_auth
		puts "CHECKING AUTH STATUS"

		api_key = ApiKey.find_by_access_token(params[:access_token])
		usr = User.find(api_key.user_id)
		#puts "CHECKING AUTH FOR USER: #{usr}"
		role = usr.role
		puts "ROLE: #{role}"
		msg = "SUCCESS"

		respond_to do |format|
    		format.json  { render :json => { :msg => msg, :role => role } }   		
  		end
	end


	# Checks if access to a URL is permitted based on the role of the user attempting to access it. Client must
	# 	pass in a valid role parameter along with a valid API token, and if the token is valid and the passed in role
	#   matches the stored role of the user associated with the API token, access is granted
	def protect_auth
		api_key = ApiKey.find_by_access_token(params[:access_token])
		usr = User.find(api_key.user_id)
		puts "IS ROLE AUTHORIZED? #{params[:role] == usr.role}"
		#head :unauthorized unless params[:role] == usr.role


		msg = ''
		if params[:role] == usr.role
			msg = "AUTHORIZED"
		else
			msg = "UNAUTHORIZED"
		end
		respond_to do |format|
    		format.json  { render :json => { :msg => msg } }   		
  		end
	end


	# Rewritten version of protect_auth above. This will be used to determine authentication & authorization for client-side redirects
	def client_redirect_auth
		# Since the :restrict_access method is called whenever this method is called, that will take care of unauthenticated users (will return a 404 before this method is even run)
		api_key = ApiKey.find_by_access_token(params[:access_token])
		usr = User.find(api_key.user_id)
		role = usr.role
		timeUntilExp = ''

		msg = "UNAUTHORIZED"
		if params[:authorize]
			if params[:role] == usr.role
				# Roles match and user is authorized
				msg = "AUTHORIZED"
			end
		else
			# User is authenticated (logged in) but is not authorized
			msg = "AUTHENTICATED"
		end

		if api_key
			puts "WHY DOESNT THIS WORK? #{distance_of_time_in_words(Time.now, api_key.expires_at)}"
			puts "SECONDS #{((api_key.expires_at - Time.now).seconds).round}"
			timeUntilExp = ((api_key.expires_at - Time.now).seconds).round
		end
		respond_to do |format|
    		format.json  { render :json => { :msg => msg, :role => role, :timeUntilExp => timeUntilExp } }   		
  		end
	end 


end
