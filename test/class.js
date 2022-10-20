var http = require("http");
var express = require("express");
var app = express( );
var ExpressRouter = express['Router'];

class Router extends ExpressRouter{
  constructor( ...args ){
    super( ...args );
  }
  get( ...args ){
    console.log("Debug");
    //super.get( ...args );
  }
  demo(){
    return "OK";
  }
}

var route = new Router( );
route.get("/", ( req, res, next ) => {
  res.send("Request OK");
});

app.use("/demo", (req, res, next) => {
  res.inject = ( ...args ) => {
    console.log( args );
    res.send( "Injection success" );
  };
  res.send = ( ) => {
    console.log( this, res.send );
    res.end("Injection success");
  }
  route.stack[0].handle( req, res, next );
});

app.use( '/', route );
http.createServer( app ).listen( 3000 );