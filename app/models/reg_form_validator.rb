class RegFormValidator
	include ActiveModel::Model
	include ActiveModel::Validations
	include ActiveModel::Conversion
	extend ActiveModel::Naming

	attr_accessor :type, :value

	VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

	#if :type == "uname" 
	validates_length_of :value, minimum: 10, too_short: 'Username must be at least 10 characters', :if => :validateUsername #:type == "uname"
	validates_format_of :value, with: /^([^\d\W]|[-])*$/, :message => 'can only contain characters', :if => :validateUsername, :multiline => true
	#validates :value, uniqueness: { case_sensitive: false }, :if => :validateUsername

	validates_length_of :value, minimum: 6, too_short: 'Password must be at least 6 characters', :if => :validatePassword

	validates_format_of :value, with: VALID_EMAIL_REGEX, :message => 'Email is not in valid format', :if => :validateEmail, :multiline => true
	
	#end

	def validateEmail
		#puts "VALID EMAIL"
		type == "email"
	end

	def validatePassword
		#puts "VALID PASSWORD"
		type == "pass"
	end

	def validateUsername
		#puts "VALID USERNAME #{@value}"
		type == "uname"
		#validates_length_of :value, minimum: 10
	end


	#def initialize(params)
    #	@type, @value = params[:type], params[:value]
  	#end


	#puts "PARAMS@TYPE #{type')}"

	#if @type == "email"
	#	puts "VALIDATING EMAIL"
	#end

	#def initialize(attributes = {})
	#    attributes.each do |name, value|
	      	#send("#{name}=", value)
	#    end
  	#end

  	#def initialize(attributes = {})
    #	@attributes = attributes
  	#end

  	#def persisted?
    #	false
  	#end

end