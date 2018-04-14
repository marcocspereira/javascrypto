/**
 * managing the routing logic
 */


/**
 * with define, we're telling RequireJS that this is a module that will not only possibly depend on others,
 *      but it's dependable by other modules created both with the define and the require function
 */
define(function() {
    var routes = {
        list:
            {
                hash: '#list',
                controller: 'crypto-list-controller'
            },
        detail:
            {
                hash: '#details',
                controller: 'crypto-detail-controller'
            }
    };

    var defaultRoute = 'list';
    var currentHash = '';

    function startRouting() {
        window.location.hash = window.location.hash || routes[defaultRoute].hash;
        currentHash = window.location.hash;
        loadDefaultRoute();
        setInterval(hashCheck, 100);
    }

    /**
     * checks if the hash has changed compared to the currentHash,
     * 		and if it matches one of the routes,
     * 		calls loadController with the corresponding controller name.
     */
    function hashCheck() {
        var routeName;

        // currentHash hasn't changed
        if (window.location.hash === currentHash) {
            return;
        }

        // check if any known route was select. Get the name of the 1st occurrence if true
        routeName = Object.keys(routes).find(function(routeElementName) {
            return window.location.hash === routes[routeElementName].hash;
        });

        // if unknown route is selected, then we must return the default
        if (!routeName) {
            loadDefaultRoute();
            return;
        }

        // we are at this level, so route is different and is known. Let's load the controller
        loadController(routes[routeName].controller);
    }

    function loadDefaultRoute() {
        window.location.hash = routes[defaultRoute].hash;
        loadController(routes[defaultRoute].controller);
    }

    function loadController(controllerName) {
        // update the currentHash for the selected one
        currentHash = window.location.hash;

        // load the controller
        require(['controllers/' + controllerName], function(controller) {
            controller.start();
        });
    }

    return {
        startRouting: startRouting
    };

});
