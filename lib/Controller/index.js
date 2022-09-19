function Controller( ){
  let _pivate = new Object( );
  let _public = new Object( );

  this.exec = function Execute( name, ...args ){
    if( _public[ name ] ){
      _public[ name ]( ...args );
    }
  }
  this.public = function Public( name, feature ){
    this._public[ name ] = feature;
  }
  this.private = function Private( name, feature ){
    this._private[ name ] = feature;
  }
}


module.exports = Router;