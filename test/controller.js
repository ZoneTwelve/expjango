var assert = require('assert');
var Exprango = require('../');
var Controller = Exprango.Controller;
var control = null;


describe("Controller", function( ){
  it("Create a Controller", function( ){
    control = new Controller( );
    // add public function
    control.public( "test", ( ) => "test" );
    
    // add private function
    control.private( "test2", ( ) => "test2" );
    // require complete function to convert into a ControllerContainer
    let complete = typeof control.complete;
    assert.equal( complete, "function" );  
  });
  
  it("Insider Controller", function( ){
    // require complete function to convert into a ControllerContainer
    let InsideController = control.complete( { name: "ctrl", allowPrivate: true } );
    assert.equal(InsideController.test(), "test");
    assert.equal(InsideController.test2(), "test2");
  });
  
  it("Outsider Controller", function( ){
    // require complete function to convert into a ControllerContainer
    let OutsideController = control.complete( { name: "ctrl", allowPrivate: false } );
    let errorFromPrivate = "This method is not allowed to be used.";
  
    assert.equal(OutsideController.test(), "test");
    assert.equal(OutsideController.test2().message, errorFromPrivate);
  });
});