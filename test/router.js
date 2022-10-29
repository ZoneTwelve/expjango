var assert = require('assert');
var Expjango = require('../');
var Router = Expjango.Router;

describe('Router', function( ){
  it('Should return a router', function( ){
    let router = new Router( );
    assert(typeof router === "function");
  });
});