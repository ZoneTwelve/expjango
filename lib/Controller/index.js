function Controller( ){ // this controller will be control by express extension
  let _private = new Object( );
  let _public = new Object( );

  this.complete = ( { name, allowPrivate } ) => {
    // when allowPrivate is true
    //    ControllerContainer will give the private function to the caller
    // when allowPrivate is false
    //   ControllerContainer won't allow execute private function
    // Next step:
    //   - upgrade ControllerContainer to support allow private 
    return new ControllerContainer( { private: _private, public: _public, allowPrivate } );
  }
  
  this.public = function Public( name, feature ){
    _public[ name ] = feature;
  }

  this.private = function Private( name, feature ){
    _private[ name ] = feature;
  }
}

function ControllerContainer( { private, public, allowPrivate } ){
  // [ Security issues ]
  // a list of name can not be used, including the node.js bullt-in function
  // avoid the confliction or illegal override.
  let denyNameList = [ 'constructor', 'complete', 'public', 'private', '__proto__', 'prototype' ];

  // link the private and public function to the container
  // currently, private and public function won't have the same name.
  for( let key in private ){
    if( denyNameList.indexOf( key ) > -1 ){
      throw new Error( `The key ${key} is not allowed to be used.` );
    }

    // Question: how to reconize where where's the caller come from?
    // GitHub Copilot Answer: use the 'this' keyword to reconize the caller.
    // GitHub Copilot Answer: use the stack trace to get the caller's name
    // but I think it's not the solution.
    // firstable, executor will be the global caller.

    if( this[ key ] === undefined ){
      if( allowPrivate ){
        this[ key ] = ( ...args ) => Executor( key, private[key], ...args );
      }else{
        this[ key ] = ( ...args ) => {
          return new Error( `This method is not allowed to be used.` );
        }
      }
    }
  }

  for( let key in public ){
    if( denyNameList.indexOf( key ) > -1 ){
      throw new Error( `The key ${key} is not allowed to be used.` );
    }

    if( this[ key ] === undefined ){
      this[ key ] = ( ...args ) => Executor( key, public[key], ...args );
    }
  }
}

function Executor( name, feature, ...args ){
  // check if the feature is a function
  if( typeof feature !== 'function' ){
    throw new Error( `The feature ${feature} is not a function.` );
  }


  // // check if the feature is a private function
  // if( feature in _private ){
  //   throw new Error( `The feature ${feature} is a private function.` );
  // }

  // // check if the feature is a public function
  // if( feature in _public ){
  //   return _public[ feature ]( ...args );
  // }
  return feature( ...args );
}

module.exports = Controller;