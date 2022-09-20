#!/usr/bin/env node
'use strict'

var express = require('express');
var Modular = require('..');

var Controller = new Modular.Controller( );


Controller.public( 'login', ( account, password ) => { 
  console.log(`Your account is ${account}, and your password have ${password.length} digits.`);
});

Controller.private( 'register', ( ) => {
  console.log("Registering...");
});

var app = express( );
Modular.upgrade( app );
 
app.modular( 'sample', { control: controller });

let logRes = app['sample']['control'].login( 'admin', '123456' );
let regRes = app['sample']['control'].register( );
console.log( logRes, regRes );