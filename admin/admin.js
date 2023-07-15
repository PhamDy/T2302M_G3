var app = angular.module("admin", [])
app.controller('adminCtrl', function($scope, $http){
    $http.get('/T2302M_G3/products.json')
        .then(function(response) {
            $scope.products = response.data;
        });
    $scope.tableProduct = true;
    $scope.showProduct = function() {
      $scope.tableProduct = !$scope.tableProduct;
    }
    $scope.delete = function(id) {
        for (i in $scope.products) {
            if ($scope.products[i].id == id) {
                $scope.products.splice(i,1);     
                break;          
            }
        }
    }

    $scope.edit = function(product) {
        $scope.editProduct  = angular.copy(product)          
    }
    
        
});