#!/usr/bin/env node

'use strict';

/*
 * Express.js Modular Extension registrations
 * @private
 */

var Modular = require('./application');
var Controller = require('./Controller');


function upgrade( app, config ){
  // check config parameters then passthrough to Modular
  let modular = new Modular( app );
  app.modules = new Object( );
  app.modular = ( ...args ) => modular.createModule( ...args );
  // app.feature = ...
}

function Router( ){
  this.routes = new Object( );
}


module.exports = {
  upgrade, 
  Controller
}