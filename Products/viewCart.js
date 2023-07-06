angular.module('myCart', [])
  .controller('viewCartController', function($scope, $window) {
    var storedData = $window.sessionStorage.getItem('cartItems');
    $scope.cartItems = JSON.parse(storedData);
  });