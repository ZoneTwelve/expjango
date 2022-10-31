const exprango = require("../../../");
const Router = new exprango.Router( );
const path = require("path");
const handlebars = require("handlebars");

Router.setView( "engine", handlebars );
Router.setView( "view", path.join( __dirname, "views" ));
Router.setView( "layout", path.join( __dirname, "views", "layout" ) );
Router.setView( "ext", ".hbs" );
Router.setView( "default", [
  {
    name: "layout",
    format: "static",
    replaceable: false,
    content: "main"
  },
  {
    name: "partials/navbar",
    format: "dynamic",
    replaceable: true,
    parser: () => path.join( "partials", "navbar" )
  }
]);

Router.get("/", (req, res) => {
  res.render("index");
});

Router.get("/layout", ( req, res ) => {
  res.render( "index", { layout: "second" } );
})

module.exports = Router;