function Controller( ){ // this controller will be control by express extension
  let _pivate = new Object( );
  let _public = new Object( );

  this.public = function Public( name, feature ){
    this._public[ name ] = feature;
  }
  
  this.private = function Private( name, feature ){
    this._private[ name ] = feature;
  }
}


module.exports = Controller;