function Controller( ){ // this controller will be control by express extension
  let _pivate = new Object( );
  let _public = new Object( );

  this.complete = ( name ) => {
    return new ControllerContainer( name, _private, _public );
  }
  
  this.public = function Public( name, feature ){
    _public[ name ] = feature;
  }

  this.private = function Private( name, feature ){
    _private[ name ] = feature;
  }
}

function ControllerContainer( _name, _private, _public ){
  // [ Security issues ]
  // a list of name can not be used, including the node.js bullt-in function
  // avoid the confliction or illegal override.
  let denyNameList = [ 'constructor', 'complete', 'public', 'private', '__proto__', 'prototype' ];

  for( let key in _private ){
    if( denyNameList.indexOf( key ) > -1 ){
      throw new Error( `The key ${key} is not allowed to be used.` );
    }

    // Question: how to reconize where where's the caller come from?
    // GitHub Copilot Answer: use the 'this' keyword to reconize the caller.
    // GitHub Copilot Answer: use the stack trace to get the caller's name
    // but I think it's not the solution.
    this[ key ] = ( ...args ) => Executor(  )
  }
  for( let key in _public ){
    if( denyNameList.indexOf( key ) > -1 ){
      throw new Error( `The key ${key} is not allowed to be used.` );
    }

    this[ key ] = ( ...args ) => Executor( _name, key, ...args );
  }
}

function Executor(  ){

}

module.exports = Controller;