// AngularJs 
// Read data Json
angular.module('myApp', [])
  .controller('myController', function($scope, $http) {
    $http.get('../Products/products.json')
      .then(function(response) {
        $scope.products = response.data;
      });

    $scope.productId = 1;

    $scope.getProductById = function(id) {
        if ($scope.products) {
            return $scope.products.find(function(product) {
              return product.id === id;
            });
          }
          return null
    };

  });

