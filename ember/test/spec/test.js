/*global describe, it */
'use strict';
/* Order and include as you please. */



//var EmberApp = require('../../app/scripts/app'); 



(function () {
	
	require('spec_helper');
	//mocha.setup("bdd");
	//chai.should();

	/*
    // Original example test code
    describe('Give it some context', function () {
        describe('maybe a bit more context here', function () {
            it('should run here few assertions', function () {

            });

            
            it('should equal to a number', function () {
                expect(1).to.equal(1);
            });
        });
    });
	*/


    
	//window.EmberApp = Ember.Application.create();
	EmberApp.Store = DS.Store.extend({
	    revision: 12,
	    adapter: DS.FixtureAdapter.create({ simulateRemoteResponse: false })
	});

	EmberApp.Question.FIXTURES = [{
	    id: 1,
	    name: "Test Question",
	}, {
	    id: 2,
	    name: "Another Question",
	}];
	
	//mocha.setup('bdd');
    
    
    beforeEach(function () {
    	Ember.run(function () { EmberApp.reset(); });
	    Ember.testing = true;
	});

	// Run after each test case.
	afterEach(function () {
	    Ember.testing = false;
	});
	

	// Sample model test.
	describe("EmberApp.Question", function () {



	    it("has a name", function () {
	        var q;
	        Ember.run(function () {
	            // Won't actually load until the end of the run-block.
	            q = EmberApp.Question.find(1);
	        });
	        q.get("name").should.equal("Test Question BULL");
	    });
	});
	
	
	describe("Store Test", function() {
		it("is revision 12", function() {
			expect(EmberApp.Store.revision).to.equal(12);
		});
	});
	

    
	
    
	


	
	
	

})();
