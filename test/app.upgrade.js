#!/usr/bin/env node
'use strict'

var express = require('express');
var Modular = require('..');

// www: Create express application
var app = express( );
var http = require('http');
Modular.upgrade( app );
// End of express application

// ----- control.js: sample controller -----
var Controller = new Modular.Controller( );
let controlMemory = { users: new Object( ) };
Controller.public( 'login', ( account, password ) => {
  try{
    let user = controlMemory['users'][account];
    if( user===password ){
      return { message:"Login success" };
    }
    return { error: "Login failed" };
  }catch( error ){
    return { error: error };
  }
});

Controller.private( 'register', ( a, p ) => {
  try{
    controlMemory['users'][a] = p;
    return { message:"Create account successful!" };
  }catch( error ){
    return { error };
  }
});

// ----- route.js: sample router -----
var Router = new Modular.Router( );

Router.get('/', ( req, res, next ) => {
  console.log("----- Request -----");
  let { self } = req.root;
  console.log( self );
  // res.send( 'Hello, World!' );
  next( );
});

Router.post('/signup', ( req, res ) => {
  console.log("----- Request -----");
  let { self } = req.root;
  let result = self.register( "test", "123456" );
  console.log( result );
  res.send( result );
});

Router.post("/signin", ( req, res ) => {
  console.log("----- Request -----");
  let { self } = req.root;
  let result = self.login( "test", "123456" );
  console.log( result );
  res.send( result );
});

Router.get('/', ( req, res ) => {
  console.log("----- Request -----");
  let { self } = req.root;
  console.log( self );
  res.send( 'next Hello, World!' );
});

// End of sample modules


// app.js: 
// app constructor
// create an sub-modules
app.modular( 'sample', { control: Controller, route: Router } );
let { sample } = app.modules;
console.log( sample );
// End of app.js

// test
// run application sub-modules controller
let loginResult = sample.control.login( 'test', '123456' );
let registerResult = sample.control.register( 'test', '123456' );


console.log( {loginResult, registerResult} );

http.createServer( app ).listen( 3000 );