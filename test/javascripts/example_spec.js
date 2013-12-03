//= require spec_helper

// Original example test code
describe('Give it some context', function () {
    describe('maybe a bit more context here', function () {
        it('should run here few assertions', function () {
        	expect(1).to.equal(1);
        });
    });
});

/*
describe('The object under test', function() {
  beforeEach(function() {
    Test = {
      truth: true
    };
  });

  afterEach(function() {
    // do something
  });

  it('has to be true', function() {
    expect(Test.truth).to.equal(true); // BDD style
  });

  context("All is a lie!", function() {
    beforeEach(function() {
      Test = {
        truth: false
      };
    });

    it('was true', function() {
      Test.truth.should.not.equal(true); // Should style
    });
  });
});
*/