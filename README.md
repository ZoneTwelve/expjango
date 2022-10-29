# Expjango - a express.js modular extension
## Introduction
Sometimes creates an application with friends will be a little hard, so I create this modular extension for making express.js user's code turn into a module.

then the sub-app could install or uninstall easier by creating a sub-app folder and writing into the `install_app.js`.

Note: We didn't use `install_apps.js` for now. [date=2022-10-29]

## MRV Structure
Model-Route-View, it's an entirely new software engineering model.

Note: The document is not available right now.

## Controller

It's an essential function for sub-modules itself, but this also has outsider caller support, making multiple application can combine together.

### How to use
```
var { Controller } = require("expjango");
```

### Public method:
```
function Register( account, password ){

}

Controller.public("register", Register);
```

### Private method:
```
function Login( account, password ){

}

Controller.private("login", Login);
```

## Router
Same as a normal Router, but add a root manager for accessing other modules.

## Models
--- Prepairing ---

# TODO
 - Support three-party socket modules
 - Router
   - render middleware ( change the base directory of templates )