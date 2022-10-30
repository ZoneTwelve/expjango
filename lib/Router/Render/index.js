// this will turn to default render engine, because I don't want to handle it
const path = require("path");
const fs = require("fs");

function Render( { views } ){
  this.Home = views.view;
  this.Layout = views.layout;
  this.Partials = views.partials;
  this.Extension = views.ext;

  this.engine = views.engine;

  if( this.engine !== null && this.Layout !== null ){
    this.engine.registerPartial( 'body', this.Layout );
  }
}

Render.prototype.render = function( view, options ){
  options = options || { };
  // check the layout and partials from the view
  let { engine, Layout, Home, Extension } = this; // base on handlebars
  
  let template = null;
  if( options.layout !== undefined && Layout !== null ){
    let layoutHtml = readFile( Layout, options.layout, Extension );
    template = engine.compile( layoutHtml );
    options['body'] = readFile( Home, view, Extension );
  }else{
    template = engine.compile( readFile( Home, view, Extension ) );
  }

  if( template === null ){
    return "Error: Template is not found";
  }else{
    return template( options );
  }
}

function readFile( base, file, ext ){
  // vulnerable at ext
  return fs.readFileSync( path.join( base, file ) + ext, 'utf8' );
}

module.exports = Render;
