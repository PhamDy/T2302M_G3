// var app = angular.module("myApp", [])
app.controller('adminCtrl', function($scope, $http){
    $http.get('/T2302M_G3/products.json')
        .then(function(response) {
            $scope.products = response.data;
        });
    $scope.tableProduct = false;
    $scope.showProduct = function() {
      $scope.tableProduct = !$scope.tableProduct;
    }
    $scope.closeEdit = function() {
        $scope.editProduct = false;
    }
    // Delete
    $scope.delete = function(id) {
        for (i in $scope.products) {
            if ($scope.products[i].id == id) {
                $scope.products.splice(i,1);     
                break;          
            }
        }
    }
    // Edit
    $scope.edit = function(product) {
        $scope.editProduct  = angular.copy(product)          
    }
    $scope.saveEdit = function() {
        var newEditProduct = {
            id: $scope.editProduct.id,
            img1: $scope.editProduct.img1,
            name: $scope.editProduct.name,
            price: $scope.editProduct.price,
            categories: $scope.editProduct.categories,
            brand: $scope.editProduct.brand,
            size: $scope.editProduct.size,
            color: $scope.editProduct.color,
            quantity: $scope.editProduct.quantity,
            sold: $scope.editProduct.sold
        };
        var index = $scope.products.findIndex(function(product) {
            return product.id === newEditProduct.id;
        })
        if (index !== -1) {
            $scope.products[index] = newEditProduct;
        }
    }
    $scope.cancelEdit = function() {
        $scope.editProduct = null;
      }
    
    // Add  
    $scope.add = function() {
        $scope.newProduct = {};
    }
    $scope.closeAdd = function() {
        $scope.newProduct = null;
    }
    var uid = 43;
    $scope.saveAdd = function() {
        if ($scope.newProduct.id == null)
            $scope.newProduct.id = uid++;
            $scope.products.push(angular.copy($scope.newProduct));
        console.log($scope.newProduct.id)
    };
    $scope.cancelAdd = function() { 
        $scope.newProduct = null;
    }

   // Show The order
  $scope.showOrder = false;
  $scope.showTheOrder = function() {
    $scope.showOrder = !$scope.showOrder;
  }
  
      


});