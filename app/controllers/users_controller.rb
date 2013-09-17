class UsersController < ApplicationController

	#skip_before_filter :verify_authenticity_token, :except => [:create]
	protect_from_forgery :except => :create

  	def new

  	end

  	def create
  		#puts "PARAMS: "params
  		# If defined (if the text fields were not blank when submitted), the values will show up as key/value pairs in the params hash
  		logger.debug("REACHED SERVER")
  		params.each do |key,value|
  			Rails.logger.debug "Param #{key}: #{value}"
      end
      
      respond_to do |format|
          format.json  { render :json => { :usr => "created" } }
      end
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
