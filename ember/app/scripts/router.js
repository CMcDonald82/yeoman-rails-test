EmberApp.Router.map(function () {
  	this.resource("register", { path: "/register" });  	
  	this.route("patient", { path: "/patient" });
  	this.route("typetwo", { path: "/typetwo" });
  	this.resource("questions", function() {
  		this.resource("question", { path: "/:question_id" });
  	})
  	
});
