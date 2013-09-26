class RegFormValidatorController < ApplicationController

	
	#def new
	#	@validator = RegFormValidator.new
	#end

	def create
		@validator = RegFormValidator.new(type: params[:type], value: params[:value])

		puts "CONTROLLER VALIDATION PARAMS: #{@validator.type}"

		
		@validator.valid?
		puts "VALID? #{@validator.valid?}"

		if !@validator.valid?
			puts "ERRORS #{@validator.errors[:value]}"
			msg = @validator.errors[:value]
		end

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