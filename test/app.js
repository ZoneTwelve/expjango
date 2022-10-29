var assert = require("assert");

var request = require("supertest");
var express = require("express");
var Expjango = require("../");

var Controller = Expjango.Controller;
var Router = Expjango.Router;
var Socket = Expjango.Socket;

// describe upgrade express to Expjango


describe("Expjango upgrade", function( ){
  it("Should upgrade express to Expjango", function( ){
    var app = express( );
    Expjango.upgrade( app );
    let modularIsFunction = typeof app.modular;
    let modulesIsObject = typeof app.modules;
  
    assert.equal( modularIsFunction, "function" );
    assert.equal( modulesIsObject, "object" );
  });
})

describe("Expjango with Controller", function( ){
  var notAllowErrorMessage = "This method is not allowed to be used.";
  var app = express( );
  Expjango.upgrade( app );
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

describe("Expjango with Router", function( ){
  it("Should using router create a submodule", function( ){
    let router = new Router( );
    router.get( "/", ( req, res ) => res.send("test") );
    
  });
});