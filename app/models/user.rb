class User < ActiveRecord::Base

	HUMANIZED_ATTRIBUTES = {
		:name => "Username"
	}

	before_save { self.email = email.downcase, self.name = name.downcase }
	
	VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
	validates :name, presence: true, length: { minimum: 6, maximum: 25, too_short: 'TOO SHORT'}, uniqueness: { case_sensitive: false }
	validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
	has_secure_password
	validates :password, length: { minimum: 6 }

	def self.human_attribute_name(attr, options={})
		HUMANIZED_ATTRIBUTES[attr.to_sym] || super
	end

end
