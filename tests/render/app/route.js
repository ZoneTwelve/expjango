const exprango = require("../../../");
const Router = new exprango.Router( );
const path = require("path");
const handlebars = require("handlebars");

Router.setView( "engine", handlebars );
Router.setView( "view", path.join( __dirname, "views" ));
Router.setView( "layout", path.join( __dirname, "views", "layout" ) );
Router.setView( "ext", ".hbs" );

Router.get("/", (req, res) => {
  res.render("index");
});

Router.get("/layout", ( req, res ) => {
  res.render( "index", { layout: "main" } );
})

module.exports = Router;