var ExpressRouter = require('express').Router;

class Router extends ExpressRouter {
  constructor( ){
    super( );
    this.eventStack = [ ];
  }
  
  use( ...args ){
    this.eventStack.push( { method: 'use', args } );
  }

  get( ...args ){
    this.eventStack.push( { method: 'get', args } );
  }

  post( ...args ){
    this.eventStack.push( { method: 'post', args } );
  }

  put( ...args ){
    this.eventStack.push( { method: 'put', args } );
  }

  delete( ...args ){
    this.eventStack.push( { method: 'delete', args } );
  }

  all( ...args ){
    this.eventStack.push( { method: 'all', args } );
  }

  complete( appname ){
    let route = new RouterContainer( {Name: appname, router: this} );
    return route;
  }
}

function RouterContainer( { Name, router } ){
  let root = null;

  router.use( (req, res, next) => {
    req.root = root;
    next( );
  });

  for( let key in router.eventStack ){
    let event = router.eventStack[ key ];
    router[ event.method ]( ...event.args );
  }

  this.construct = function Constructor( _root ){
    root = _root;
    delete this['construct'];
  }
}


module.exports = Router;
