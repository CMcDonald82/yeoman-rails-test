module SessionsHelper

	def sign_in(user)
		self.current_user = user
		
		#puts "SESSION USER ID: #{session[:current_user_id]}"
		#puts "CURRENT USER: #{self.current_user.name}"
	end

	def current_user=(user)
		@current_user = user
	end


	def current_user
		user_id = session[:current_user_id]
		puts "CURRENT_USER SESSION ID: #{session[:current_user_id]}"
		@current_user ||= User.find_by(id: session[:current_user_id])
		puts "@current_user: #{@current_user}"
	end


	def signed_in?
		puts "CURRENT USER signed_in?: #{current_user}"
		!current_user.nil?
	end

	def sign_out
		self.current_user = nil
		#session.delete(:)
	end
end
