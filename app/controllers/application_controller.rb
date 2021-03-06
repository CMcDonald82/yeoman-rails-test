class ApplicationController < ActionController::Base
	# Prevent CSRF attacks by raising an exception.
  	# For APIs, you may want to use :null_session instead.
	  
	# Enable below for production. During development, can disable since if enabled, will cause errors on cross-domain
	# 	requests when headers are modified (necessary for Rails to receive the csrf_token)
	
	
	# Try enabling and disabling this (along with the 'PRODUCTION' variable below) on Heroku version
	#     See if the message 'Can't verify CSRF token authentication' appears in heroku logs as it does in development server
	
	#protect_from_forgery with: :exception #:null_session #:exception


	include SessionsHelper
	include Hi

	#before_filter :reset_api_token_expiration

	before_filter :restrict_access, only: [:authorize]

	

	PRODUCTION = false

	if PRODUCTION
		puts "PRODUCTION MODE"
		
	else
		puts "PHALSE"
		before_filter :cors
	end
  

	#protected

	#	def verified_request?
	#		puts "VERIFYING REQUEST... #{ form_authenticity_token }"
	#		super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
	#	end

  	def cors
  		headers['Access-Control-Allow-Origin'] = '*'
		headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
		headers['Access-Control-Request-Method'] = '*'
		headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-API-TOKEN'
  	end


  	private 

  		# Checks if valid API token is passed in. If not, returns a '401: Unauthorized' error
  		# TODO: Add check for expiration of token
  		def restrict_access
  			# Use when passing token in via params
  			
  			api_key = ApiKey.find_by_access_token(params[:access_token])
  			head :unauthorized unless api_key and api_key.expires_at > Time.current()

  			# Use when passing token in via header

  			#authenticate_or_request_with_http_token do |token, options|
  			#	ApiKey.exists?(access_token: token)
  			#end

  		end
  

  	private

  		def reset_api_token_expiration
  			#puts "CAN WE GET HEADER? #{request.headers['X-API-TOKEN']}"

  			puts "RESETTING TOKEN"
  			api_key = ApiKey.find_by_access_token(params[:access_token])
  			unless params[:is_poll]
	  			if api_key and api_key.expires_at > Time.current()
	  				puts "UPDATED"
	  				api_key.update_column(:expires_at, 5.minutes.from_now)
	  			end
	  		end
  		end


  	private

	  	def authorize(role)
	  		puts "AUTHORIZIN"
			puts "THE ROLE: #{role}"
			puts "CAN WE GET HEADER? #{request.headers['X-CSRF-TOKEN']}"
			puts "CAN WE GET PARAMS? #{params[:access_token]}"
	  		api_key = ApiKey.find_by_access_token(params[:access_token])
			if api_key 
			 	usr = User.find(api_key.user_id)
			 	puts "#{usr.role == role}"
			end

			head :unauthorized unless usr and usr.role == role
	  	end
  	

end
