const RouterContainer = require("./container");

function Router( ){
  let eventStack = [ ];
  let views = {
    view: null,
    layout: null,
    partials: null,
    engine: null,
    ext: null,
    default: null
  };
  const eventPush = ( method, ...args ) => eventStack.push( { method, args } );
  const viewsInsert = ( key, value ) => {
    if( views.hasOwnProperty( key ) ){
      views[key] = value;
    }
  }
  this.use = ( ...args ) => eventPush( 'use', ...args );
  this.get = ( ...args ) => eventPush( 'get', ...args );
  this.post = ( ...args ) => eventPush( 'post', ...args );
  this.put = ( ...args ) => eventPush( 'put', ...args );
  this.delete = ( ...args ) => eventPush( 'delete', ...args );
  this.all = ( ...args ) => eventPush( 'all', ...args );
  // this.patch = ( ...args ) => eventPush( 'patch', ...args );
  // this.route = ( ...args ) => eventPush( 'route', ...args );
  // this.options = ( ...args ) => eventPush( 'options', ...args );
  // this.head = ( ...args ) => eventPush( 'head', ...args );
  // this.trace = ( ...args ) => eventPush( 'trace', ...args );
  // this.connect = ( ...args ) => eventPush( 'connect', ...args );
  this.setView = viewsInsert;
  this.complete = function Complete( appname ){
    return {
      construct: function Constructor( Root ){
        let config = {
          Name: appname,
          Evnets: eventStack,
          Root: Root,
          Views: views
        }
        return RouterContainer( config );
      }
    }
  }
}

module.exports = Router;
