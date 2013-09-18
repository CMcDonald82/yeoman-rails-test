class UsersController < ApplicationController

  before_filter :cors, :verify
	#skip_before_filter :verify_authenticity_token, :except => [:create]
	protect_from_forgery #:except => :create

  

  	def new

  	end

  	def create
      #@current_user = current_user
  		#puts "PARAMS: "params
  		# If defined (if the text fields were not blank when submitted), the values will show up as key/value pairs in the params hash
  		logger.debug("REACHED SERVER")
  		
      ses = session[:_csrf_token]
      logger.debug("session: #{ses}")

      params.each do |key,value|
  			Rails.logger.debug "Param #{key}: #{value}"
      end
      
      respond_to do |format|
          format.json  { render :json => { :usr => "created" } }
      end


      

      #logger.debug("User Token: #{form_authenticity_token}")

      #puts session.inspect

      #logger.debug(params[:session])
      verified = verified_request?
      logger.debug("Verified? #{verified}")

		end

    def cors
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
      headers['Access-Control-Request-Method'] = '*'
      headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-CSRF-Token'
    end

    def verify
      logger.debug("Verified (before_filter)? #{verified_request?}")
    end


		

    #@uname = request
		#	logger.debug("UNAME: #{@uname}")
			
		#Rails.logger.debug "INSPECT"
		#Rails.logger.debug params.inspect

    #tkn = form_authenticity_token
    #Rails.logger.debug("TOKEN #{tkn}")
		
  		 
  		#@user = User.new(params[:user])
  		#if @user.save
  			# Handle successful save
  		#else
  			# Handle unsuccessful save
  	#end

end
