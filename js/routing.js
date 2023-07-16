app.config(function ($routeProvider) {
    $routeProvider
    .when("/product", {
        templateUrl : "./src/viewproducts.html",
        controller : "myController"
    })
    .when("/details/:id/:name", {
        templateUrl : "./src/viewdetails.html",
        controller : "myController"
    })
    .when("/viewCart", {
        templateUrl : "./src/viewCart.html",
        controller : "myController"
    })
    .when("/checkout", {
        templateUrl : "./src/checkout.html",
        controller : "myController"
    })
    .when("/complete", {
        templateUrl : "./src/complete.html",
        controller : "myController"
    })
    .when("/login", {
        templateUrl : "./src/login.html"
    })
    .when("/gallery", {
        templateUrl : "./src/gallery.html"
    })
    .when("/feature", {
        templateUrl : "./src/feature.html"
    })
    .when("/aboutUs", {
        templateUrl : "./src/aboutUs.html"
    })
    .when("/", {
        templateUrl : "./src/home.html",
        controller : "myController"
    })
});
