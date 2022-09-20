/*
  Modular application
*/

'use strict';

// var Controller = require('./Controller');
// var moduleApp = require('./modules');

// Create Containlize Application 
function ModularContainer( app ){
  this.createModule = ( ...args ) => createModule( app, ...args );
}

// Modular sub function
function createModule( app, name, config ){
  app.modules[ name ] = new Object( );
  app.modules[ name ]['hello'] = ( ) => { return "world"; }
  
  for( let key in config ){
    // initialize different controller
    let conf = config[ key ];
    // app.modules[ name ] = controller;
    // create controller ... 
  } 
}

module.exports = ModularContainer;