class CsrfController < ApplicationController
  	
  	respond_to :json

  	def create
  		logger.debug("CRAP")
		tkn = form_authenticity_token
		msg = { :csrf_token => tkn }
		respond_with(msg)
		#respond_to do |format|
    	#	format.json  { render :json => msg }  		
  		#end
  	end

end
