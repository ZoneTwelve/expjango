var request = require("supertest");
var assert = require('assert');
var express = require("express");
var exprango = require('../');
var Router = exprango.Router;

describe('Router', function( ){
  let app = express( );
  let route = null;
  exprango.upgrade( app );

  it('Should return a router', function( ){
    route = new Router( );
    let Route = route.complete( "app" );
    assert(typeof Route.construct === "function");
    assert(typeof route.complete === "function");
  });

  it("Should make 'GET /app' avaliable", function( done ){
    let res_one = "OK, GET /";
    let res_404 = "Not found";
    route.get('/', (req, res) => {
      res.send( res_one );
    });
    route.all('*', (req, res) => res.status(404).send( res_404 ));
    exprango.upgrade( app );
    app.modular( "app", { route } );
    request( app )
      .get('/app')
      .expect(200, done);
  });
  it("Should return 404 Not found", function(done){
     request( app )
      .get('/app/anything')
      .expect(404, done);
  });
});

