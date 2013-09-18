class ApplicationController < ActionController::Base
	# Prevent CSRF attacks by raising an exception.
  	# For APIs, you may want to use :null_session instead.
	  
	# Enable below for production. During development, can disable since if enabled, will cause errors on cross-domain
	# 	requests when headers are modified (necessary for Rails to receive the csrf_token)
	
	protect_from_forgery with: :null_session #:exception

	before_filter :cors
  

  	def cors
  		headers['Access-Control-Allow-Origin'] = '*'
		headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
		headers['Access-Control-Request-Method'] = '*'
		headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  	end
  
  	

end
