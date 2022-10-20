/**
 * Upgraded version of the Router class
 */

var ExpressRouter = require('express')['Router'];

function Router( ){
  let stack = [ ];

  this.get = function Get( path, call ){
    stack.push( new routeNode( { method: "GET", path, call } ) );
  };

  this.post = function Post( path, call ){
    stack.push( new routeNode( { method: "POST", path, call } ) );
  };

  this.put = function Put( path, call ){
    stack.push( new routeNode( { method: "PUT", path, call } ) );
  };

  this.delete = function Delete( path, call ){
    stack.push( new routeNode( { method: "DELETE", path, call } ) );
  };

  this.complete = ( ) => {
    return {
      construct: ( root ) => RouterContainer( root, stack )
    }
  };
}

function routeNode( { method, path, call } ){
  this.method = method;
  this.path = path;
  this.call = call;
}

function Upgrade( root, ...args ){
  // args[0] is request
  // args[1] is response
  // args[2] is next

}

function UpgradeRender( ){

}

function RouterContainer( root, stack ){
  let MainRoute = ExpressRouter( );
  for( let node of stack ){
    let { method, path, call } = node;
    
    if( MainRoute[ method.toLowerCase() ] ){
      MainRoute[ method.toLowerCase() ]( path, ( ...args ) => call( root, ...args ) );
    }
    // MainRoute.get( node.path, ( ...args ) => node.call( root, ...args ) );
  }
  
  return MainRoute;
}

function defaultModularRoot( ){
  return { error: "this function is not supported." };
}

function getCaller() {
  var stack = getStack()

  // Remove superfluous function calls on stack
  stack.shift() // getCaller --> getStack
  stack.shift() // omfg --> getCaller

  // Return caller's caller
  return stack[1].receiver
}


function getStack() {
  // Save original Error.prepareStackTrace
  var origPrepareStackTrace = Error.prepareStackTrace

  // Override with function that just returns `stack`
  Error.prepareStackTrace = function (_, stack) {
    return stack
  }

  // Create a new `Error`, which automatically gets `stack`
  var err = new Error()

  // Evaluate `err.stack`, which calls our new `Error.prepareStackTrace`
  var stack = err.stack

  // Restore original `Error.prepareStackTrace`
  Error.prepareStackTrace = origPrepareStackTrace

  // Remove superfluous function call on stack
  stack.shift() // getStack --> Error

  return stack
}

module.exports = Router;