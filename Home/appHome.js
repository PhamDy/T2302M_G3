// AngularJs 
// Read data Json
angular.module('myApp', [])
  .controller('myController', function($scope, $http) {
    $http.get('products.json')
      .then(function(response) {
        $scope.products = response.data;
      });

      $scope.filterByIds = function(ids) {
        return function(product) {
          return ids.indexOf(product.id) !== -1;
        };
      };
    // $scope.productId = 1;

    // $scope.getProductById = function(id) {
    //   if ($scope.products) {
    //     var foundProducts = $scope.products.filter(function(product) {
    //       return product.id === id;
    //     });
    
    //     if (foundProducts.length > 0) {
    //       return foundProducts[0];
    //     }
    //   }
    //   return null;
    // };

    
    
   });


