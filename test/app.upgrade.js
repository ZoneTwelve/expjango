#!/usr/bin/env node
'use strict'

var express = require('express');
var Modular = require('..');

var router = new Modular.Router( );


controller.public( 'login', ( ) => { 
  console.log(`Your account is ${account}, and your password have ${password.length} digits.`);
});

controller.private( 'register', ( ) => {
  console.log("Registering...");
});

var app = express( );
Modular.upgrade( app );

app.modular( 'sample', { control: controller });