# Simple Office Dashboard

This is a simple office dashboard app. It displays basic statistics about an office in a single page. All information is being pulled asynchronously from an `API`. 

![a simple office dashboard][/public/images/dashboard.png]

## Get Started 

The back-end runs on `node.js` and the `express` framework. The front end requires some other frameworks: `d3.js`, `jquery`, `requirejs` and `bootstrap`. The following will install the requirements needed for the application to run

```.javascript
# Install the requirements
$ npm install
# Install front end libraries
$ bower install
# and to run the app use
$ npm start
```

Or if you prefer, run the app in debug mode:

```.javascript
$ set DEBUG=myapp & npm start
```