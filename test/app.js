var assert = require("assert");

var request = require("supertest");
var express = require("express");
var Exprango = require("../");

var Controller = Exprango.Controller;
var Router = Exprango.Router;
var Socket = Exprango.Socket;

// describe upgrade express to Exprango


describe("Exprango upgrade", function( ){
  it("Should upgrade express to Exprango", function( ){
    var app = express( );
    Exprango.upgrade( app );
    let modularIsFunction = typeof app.modular;
    let modulesIsObject = typeof app.modules;
  
    assert.equal( modularIsFunction, "function" );
    assert.equal( modulesIsObject, "object" );
  });
})

describe("Exprango with Controller", function( ){
  var notAllowErrorMessage = "This method is not allowed to be used.";
  var app = express( );
  Exprango.upgrade( app );
  it("Should create a modular application with Controller", function( ){
    let control = new Controller( );
    control.public( "test", ( ) => "test" );
    control.private( "test2", ( ) => "test2" );
    app.modular( "ctrl", { control } );
    // check app.modules have ctrl
    assert.equal( app.modules.hasOwnProperty("ctrl"), true );
    assert(app.modules.ctrl.control.test() === "test");
    assert(app.modules.ctrl.control.test2().message === notAllowErrorMessage);
  });
});

describe("Exprango with Router", function( ){
  it("Should using router create a submodule", function( ){
    let router = new Router( );
    router.get( "/", ( req, res ) => res.send("test") );
    
  });
});