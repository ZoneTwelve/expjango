#!/usr/bin/env node
'use strict'

var express = require('express');
var Modular = require('..');

var Controller = new Modular.Controller( );


Controller.public( 'login', ( account, password ) => { 
  return `Your account is ${account}, and your password have ${password.length} digits.`;
});

Controller.private( 'register', ( a, p ) => {
  // console.log(a, p);
  // console.log("Registering...");
  return { account: a, password: p };
});

var app = express( );
Modular.upgrade( app );
 
app.modular( 'sample', { control: Controller });

let { sample } = app.modules;

console.log( sample );



let loginResult = sample.control.login( 'test', '123456' );
let registerResult = sample.control.register( 'test', '123456' );

// let logRes = app['sample']['control'].login( 'admin', '123456' );
// let regRes = app['sample']['control'].register( );
console.log( loginResult, registerResult );