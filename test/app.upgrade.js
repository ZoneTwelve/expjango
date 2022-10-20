#!/usr/bin/env node
'use strict'

var express = require('express');
var Modular = require('..');

// www: Create express application
var app = express( );
var http = require('http');
Modular.upgrade( app );
// End of express application

// control.js: sample controller
var Controller = new Modular.Controller( );
Controller.public( 'login', ( account, password ) => { 
  return `Your account is ${account}, and your password have ${password.length} digits.`;
});

Controller.private( 'register', ( a, p ) => {
  return { account: a, password: p };
});

// route.js: sample router
var Router = new Modular.Router( );

Router.get('/', ( root, req, res ) => {
  console.log("----- Request -----");
  let { self } = root;
  console.log( self );
  res.send( 'Hello, World!' );
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