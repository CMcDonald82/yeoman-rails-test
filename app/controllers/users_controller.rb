class UsersController < ApplicationController

  #before_filter :cors#, :verify
	#skip_before_filter :verify_authenticity_token, :except => [:create]
	#protect_from_forgery #:except => :create

  

  	def new

  	end

  	def create

      params.each do |key,value|
        Rails.logger.debug "Param #{key}: #{value}"
      end

      @user = User.new(user_params)
      if @user.save
        puts "USER SAVE SUCCESSFUL"
        # Put code here to 'login' user (try to do this by calling the 'create' method of sessions controller. If that doesn't work, just manually create an API token here)
        respond_to do |format|
          format.json  { render :json => { :msg => "SUCCESS" } }
        end
      else
        puts "user errors #{@user.errors.full_messages}"
        # Return list (array) of error messages to be parsed and displayed by client
        respond_to do |format|
          format.json  { render :json => { :msg => @user.errors.full_messages } }
        end
      end

      #@current_user = current_user
  		#puts "PARAMS: "params
  		# If defined (if the text fields were not blank when submitted), the values will show up as key/value pairs in the params hash
  		logger.debug("REACHED SERVER")
  		
      ses = session[:_csrf_token]
      puts "session: #{ses}"

      
      
      #respond_to do |format|
      #    format.json  { render :json => { :usr => "created" } }
      #end


      

      #logger.debug("User Token: #{form_authenticity_token}")

      #puts session.inspect

      #logger.debug(params[:session])
      verified = verified_request?
      puts "Verified? #{verified}"

		end


    private

      def user_params
        params.permit(:name, :email, :password, :password_confirmation, :role)
      end


    #def cors
    #  super
    #end
=begin
    def cors
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
      headers['Access-Control-Request-Method'] = '*'
      headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-CSRF-Token'
    end



    def verify
      logger.debug("Verified (before_filter)? #{verified_request?}")
    end
=end

		

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
