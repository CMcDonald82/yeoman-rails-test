class RegFormValidatorController < ApplicationController

	#before_action :signed_in?, only: [:create,  :logged_in]
	#def new
	#	@validator = RegFormValidator.new
	#end

	#include Hi
	
	#before_filter :restrict_access



	def logged_in
		puts "AM I SIGNED IN? #{signed_in?}"
	end


	def create
		@validator = RegFormValidator.new(type: params[:type], value: params[:value])

		if params[:type] == "uname" && User.exists?(name: params[:value])		
			msg = "Username already exists"
		elsif !@validator.valid?
			puts "ERRORS #{@validator.errors[:value]}"
			msg = @validator.errors[:value]
		end

		
		logged_in
=begin
		if !@validator.valid?
			puts "ERRORS #{@validator.errors[:value]}"
			msg = @validator.errors[:value]
		end

		puts "CONTROLLER VALIDATION PARAMS: #{@validator.type}"
		@validator.valid?
		puts "VALID? #{@validator.valid?}"









=begin
		if @validator.type == "email"
			#puts "VALIDATING EMAIL"
			# Call @validator.validateEmail here
			@validator.validateEmail
		end

		if @validator.type == "pass"
			@validator.validatePassword
		end

		if @validator.type == "uname"
			#@validator.validateUsername
			#self.validUser
			@validator.valid?
			puts "VALID? #{@validator.valid?}"
		end

		respond_to do |format|
    		format.json  { render :json => { :msg => "success" } }   		
  		end
	end

	def validUser
		puts "VALID USER"
	end
=end

		respond_to do |format|
    		format.json  { render :json => { :msg => msg } }   		
  		end
	
	end

end