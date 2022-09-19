/*
  Modular application
*/

'use strict';

var moduleApp = require('./modules');

function createModule( name, config ){
  // Create Containlize Application 
  
  // declare accessible module in Express.js application
  app.modules[ name ] = new Object();
  
}

module.exports = modular;