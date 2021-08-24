# tatrytec-vue-admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# Bootstrap main.js
The enter file for the apllication is main.js
This file instantiate the Vue application loads and set up libraries 
like axios, router, vuex, bootstrap, ...


# Axios
- Axios has to be set up before application start.
- The main.js sets the Authorization header with authToken from localStorage
- The main.js also check if token is valid.
- If token is missing or is not valid LoginForm component get the token from server and 
    sets the token to localStorage and axios header.
- CORS - Axios requires Access-Control-Allow-Origin header in RESPONSE
	It also includes requests to the same vue.tatrytec.eu origin (See main.js).
	https://newbedev.com/how-to-resolve-preflight-is-invalid-redirect-or-redirect-is-not-allowed-for-a-preflight-request


# Vuex
- User module
- Alerts module

# Router
- Router has to be set up before application start.
- The main.js sets beforeEach() hook for all routs which checks if user is logged in.


# Services


