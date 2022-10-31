const ExpressRouter = require('express').Router;
const Render = require('./Render');

function RouterContainer( { Name, Evnets, Root, Views } ){
  let defRouter = ExpressRouter( );
  let renderEngine = new Render( { views: Views } );
  defRouter.use( (req, res, next) => {
    req.root = Root;
    res.debug = true;
    res.render = ( view, options ) => {
      let html = renderEngine.render( view, options );
      res.send( html );
    }
    next( );
  });

  for( let e of Evnets ){
    let { method, args } = e;
    defRouter[method]( ...args );
  }

  return defRouter;
}

module.exports = RouterContainer;