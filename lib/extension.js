'use strict';

/*
 * Express.js Modular Extension registrations
 * @private
 */

var Modular = require('./application');
var Controller = require('./Controller');


function upgrade( app ){
  // check config parameters then passthrough to Modular
  let modular = new Modular( app );
  app.modules = new Object( );
  app.modular = ( ...args ) => modular.createModule( ...args );
  // app[ name ]['feature'] = [ ] controller or [ ] specific feature
  // app.feature = ...
}

module.exports = {
  upgrade, 
  Controller
}