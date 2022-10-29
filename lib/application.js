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

  for( let key in config ){
    // initialize different controller
    let conf = config[ key ];

    if( typeof conf.complete === "function" ){
      app.modules[ name ][ key ] = conf.complete( name );
    }
    // app.modules[ name ] = controller;
    // create controller ... 
  }
  let root = {
    modules: app.modules
  };
  
  // To-Do: create the entire private config for this module
  // check control is exist
  if( config.hasOwnProperty("control") ){
    root['self'] = config['control'].complete( {name, allowPrivate: true} );
  }

  // check route is exist
  if( config.hasOwnProperty('route') ){
    let router = app.modules[name]['route'].construct( root );
    // allow private method
    // root['modules'][ name ] = config[name]['control'].complete( name, true );
    // app.use( `/${name}`, ( ...args ) => config['route']( app.modules, ...args ) );
    app.use( `/${name}`, router );
  }
}

module.exports = ModularContainer;