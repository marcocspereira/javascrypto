/**
 * RequireJS is an implementation of AMD (Asynchronous Module Definition),
 *      an API for declaring modules and loading them asynchronously on the fly when they're needed.
 */

requirejs.config({
    baseUrl: 'js/app'
});


 /**
  * The require keyword tells RequireJS that this piece of code is dependent on other modules that needs to be loaded before it's executed.
  */
require(['models/crypto', 'router'], function(Crypto, Router) {


    Router.startRouting();

});
