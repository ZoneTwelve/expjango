#!/usr/bin/env node
const assert = require("assert")
const request = require("supertest");

const http = require("http");

const express = require("express");
const exprango = require("../");

var app = express();
exprango.upgrade( app );

var Router = new exprango.Router( );

Router.get("/", ( req, res ) => {
  res.send("OK");
})
app.modular( "app", { route: Router } );

request(app)
  .get('/app')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
    console.log( res );
  });

//var server = http.createServer( app );
// middle hook of socket or other applications
//server.listen( 3000 );
