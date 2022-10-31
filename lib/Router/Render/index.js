// this will turn to default render engine, because I don't want to handle it
const path = require("path");
const fs = require("fs");

/*
To-do:
 - Default configration
 [
   { 
     name: "layout",
     format: "dynamic",
     content: path.join( __dirname, "views", "layouts" ),
     parser: ( conf, value ) => path.join( util.format( conf['contnet'], value ) )
   },
   {
      name: "partials/navbar",
      format: "static",
      replaceable: true,
      content: path.join( __dirname, "views", "partials", "navbar.hbs" )
   }
 ]
*/

function Render( { views } ){
  this.Home = views.view;
  this.Layout = views.layout;
  this.Partials = views.partials;
  this.Extension = views.ext;
  this.DefaultConfig = views.default;
  
  this.engine = views.engine;

  if( this.engine !== null && this.Layout !== null ){
    this.engine.registerPartial( 'body', this.Layout );
  }
}

Render.prototype.render = function( view, options ){
  // check the layout and partials from the view
  let { engine, Layout, Home, Extension, DefaultConfig } = this; // base on handlebars
  let template = null;
  
  options = configChecker( DefaultConfig, (options || { }) );

  for( let part of Object.keys( options['partials'] ) ){
    let partial = options['partials'][part];
    // IDKWTFISTHAT
    // engine.registerPartial( part, path.join( Home, partial ) );
    options['partials'][part] = readFile( Home, partial, Extension );
  }
  
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

function configChecker( def, opts ){
  let partials = { };
  opts['partials'] = opts['partials'] || { };
  for( let conf of def ){
    let { name } = conf;
    // if partials pattern match, check the opts['patials'] for each key
    
    let partialsKey = name.match( /^partials[\/]([\S]+)/ );
    if( partialsKey !== null && partialsKey.length > 1 ){
      let key = partialsKey[1];
      partials[key] = configParser( conf, opts['partials'][key] );
    }else{
      // only follow by opts[key]
      opts[name] = configParser( conf, opts[name] );
    }
  }

  // merge the partials
  opts['partials'] = Object.assign( opts['partials'], partials);
  return opts;
}

function configParser( conf, opt ){
  let { format, replaceable, content, parser } = conf;
  format = format || "static";
  // when replaceable is undefined, default is false
  // but when format is dynamic, default won't be replaceable
  replaceable = (replaceable || false) || ( !(format === "dynamic") );
  if( replaceable === false || opt === undefined ){
    if( format === "dynamic" ){
      return parser( content, opt );
    }else if( format === "static" ){
      return content;
    }
  }else{
    // replaceable, so just return the opt
    return opt;
  }
}

function readFile( base, file, ext ){
  // vulnerable at ext
  return fs.readFileSync( path.join( base, file ) + ext, 'utf8' );
}

module.exports = Render;
