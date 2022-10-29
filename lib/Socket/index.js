var crypto = require("crypto");
var ws = require('ws');

var eventMiddleware = {
  connection: socketInitConnection
};

class Socket extends ws.WebSocketServer {
  constructor(options) { 
    // ( option, [handle] )
    super(options);
    this.HookEvents = {};
  }

  on(event, handler) {
    if(eventMiddleware[event]) {
      super.on( event, ( ...args ) => {
        eventMiddleware[event]( handler, ...args );
      });
    }else{
      super.on(event, handler);
    }
  }

  hook( event, handler ){
    if( !this.HookEvents[event] )
      this.HookEvents[event] = handler;
    // if( !this.HookEvents[event] ) this.HookEvents[event] = [];
    // this.HookEvents[event].push( handler );
  }

  complete( appname ){
    let app = new SocketContainer( {Name: appname, SocketHandler: this} )
    return app;
  }
}

function SocketContainer( { Name, SocketHandler } ){
  let self = this;
  let server = null;
  let wsc = new WebSocketContainer( );

  const initlization = ( ) => {
    if( server === null )
      throw new Error("Failed to initialize socket server.");

    server.on("upgrade", ( request, socket, head ) => {
      if( request.url === `/${Name}/ws` ){
        SocketHandler.handleUpgrade( request, socket, head, ( socket ) => {
          // insertClient
          wsc.insertClient( socket );

          // when socket disconnected, then removeClient
          socket.on("close", ( ) => {
            wsc.removeClient( socket );
            SocketHandler.emit("disconnect", socket);
          });

          SocketHandler.emit( "connection", socket, request );
        });
      }
    });
  }

  this.construct = function Constructor( _server ){
    server = _server;
    delete this['construct'];
    initlization( );

    for( let key in SocketHandler.HookEvents ){
      this[key] = ( ...args ) => SocketHandler.HookEvents[key]( wsc, ...args );
    }
  }
}

function socketInitConnection( handler, socket, request ) {
  socket.id = crypto.randomBytes(8).toString("hex");
  handler( socket, request );
}

function WebSocketContainer( ){
  let clients = [ ];
  let groups = { };

  this.Groups = ( ) => groups;
  this.Clients = ( ) => clients;
  this.find = ( id ) => {
    for( let i = 0; i < clients.length; i++ ){
      if( clients[i].id === id ){
        return clients[i];
      }
    }
    return null;
  }

  this.broadcast = ( message ) => {
    for( let i = 0; i < clients.length; i++ ){
      clients[i].send( message );
    }
  }

  this.joinGroup = ( name, socket ) => {
    groups[name] = groups[name] || {};
    groups[name][socket.id] = socket;
  }

  this.leaveGroup = ( name, socket ) => {
    if( groups[name] ){
      delete groups[name][socket.id];
    }
  }

  this.insertClient = ( socket ) => {
    clients.push( socket );
  }

  this.removeClient = ( socket ) => {
    let index = clients.indexOf( socket );
    if( index > -1 ){
      clients.splice( index, 1 );
    }
  }
}

module.exports = Socket;