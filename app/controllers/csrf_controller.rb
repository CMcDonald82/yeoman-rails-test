class CsrfController < ApplicationController
  	
  	#respond_to :json

  	#before_filter :cors

  	#protect_from_forgery

  	include Hi

  	def create
  		
		tkn = form_authenticity_token
		req_forgery = request_forgery_protection_token

		logger.debug("request_forgery_protection_token #{req_forgery}")

    # These were used to test whether cookies set on server would be sent automatically along with a JSON 
    #   response to an AJAX request from client. They are not. 
    #cookies[:remember_token] = "COOKIES"
    #puts "MYCOOKIES: #{cookies[:remember_token]}"


    # Try removing :req_forgery_token, may not be needed
		msg = { :csrf_token => tkn, :req_forgery_token => req_forgery }
		puts "CSRF CONTROLLER TOKEN: #{tkn}"
		headers['X-CSRF-TOKEN'] = tkn
		
		ses = session[:_csrf_token]
      	logger.debug("csrf session: #{ses}")

      	say_hi

    
		
		#respond_with(msg)
		respond_to do |format|
    		format.json  { render :json => msg }  		
  		end
  	end

  	#def cors
  	#	super
=begin
  		headers['Access-Control-Allow-Origin'] = '*'
		headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
		headers['Access-Control-Request-Method'] = '*'
		headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
=end
  	#end

	

end
