var app = angular.module("myApp", ["ngRoute"])
app.config(function ($routeProvider) {
    $routeProvider
    .when("/product", {
        templateUrl : "viewproducts.html",
        controller : "myController"
    })
    .when("/details/:id/:name", {
        templateUrl : "viewdetails.html",
        controller : "myController"
    })
    .when("/viewCart", {
        templateUrl : "viewCart.html",
        controller : "myController"
    })
    .when("/checkout", {
        templateUrl : "./view/checkout.html",
        controller : "myController"
    })
    .when("/complete", {
        templateUrl : "./view/complete.html",
        controller : "myController"
    })
    .when("/", {
        templateUrl : "home.html",
        controller : "myController"
    })
    
});
