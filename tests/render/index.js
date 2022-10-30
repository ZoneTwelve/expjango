#!/usr/bin/env node
const request = require("supertest");
const exprango = require("../..");
const express = require("express");
const http = require("http");

var app = express();

exprango.upgrade( app );

app.modular( "app", require("./app/config") );

/*
request( app )
  .get("/app")
  .expect( 200 )
  .end( ( err, res ) => {
    //console.log( res );
  } )
*/

let server = http.createServer( app );

server.listen( 3000 );