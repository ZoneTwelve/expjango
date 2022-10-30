var ExpressRouter = require('express').Router;

class Router extends ExpressRouter {
  constructor( ){
    super( );
    this.eventStack = [ ];
    let itself = this;
    this.complete = function Complete( appname ){
      return { 
        construct: function Constructor( root ){
        return new RouterContainer( { Name: appname, router:itself, Root:root } );
        }
      }
    }
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

  }
}

function RouterContainer( { Name, router, Root } ){
  router.use( (req, res, next) => {
    req.root = Root;
    next( );
  });

  for( let key in router.eventStack ){
    let e = router.eventStack[ key ];
    router[ e.method ]( ...e.args );
  }

  return router;
}


module.exports = Router;
