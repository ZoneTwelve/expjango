# 2022-10-31
- Render updated 
  - Support default configration for rendering
    ```javascript
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
    ```
  - Support partials conponments
    ```handlebars
    <body>
      <h1>Second design</h1>
      {{{ body }}}
      {{{ partials.navbar }}}
    </body>
    ```
# [1a5dac7] 0.0.1 / 2022-10-31
- Updated Router
  - Support Router.setView
    - view, layout, partials, extension, engine
  - Support res.render with his own configrations

# [35d44d1] 0.0.0 / 2022-10-30
- Fix Router
  - Won't return "Router" instance
- Renamed to **exprango**

# [f81e111] 0.0.0 / 2022-10-29
- Updated Socket
  - Socket can access by modules
- Renamed **expjango**


# [abd75ad] 0.0.0 / 2022-10-27
- Added Socket
- Updated **test/app.upgrade** 

# [857ff57] 0.0.0 / 2022-10-23
- Added Controller
  - Support public and private method
- Added Router
  - Same as Express Router, only but it's support to access the other modules.
- Added upgrade method
 - testcase on test folder
