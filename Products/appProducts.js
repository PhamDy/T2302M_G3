angular.module('myApp', [])
  .controller('myController', function($scope, $http) {
    $http.get('products.json')
      .then(function(response) {
        $scope.products = response.data;
      });
    
    // lọc sản phẩm theo Category và Brand
    $scope.filterCategory = 'All';
    $scope.filterBrand = '';

    $scope.filterByCategory = function(category) {
      $scope.filterCategory = category;
      $scope.filterBrand = '';
    };
    
    $scope.filterByBrand = function(brand) {
      $scope.filterBrand = brand;
      $scope.filterCategory = 'All';
    };
    
    $scope.matchCategory = function(product) {
      return $scope.filterCategory === 'All' || product.categories === $scope.filterCategory;
    };
    
    $scope.matchBrand = function(product) {
      return $scope.filterBrand === '' || product.brand === $scope.filterBrand;
    };
    // so sanh các san pham
    $scope.compareProducts = [];
    $scope.compareProduct = function(product) {
      var index = $scope.compareProducts.indexOf(product);
      if (index === -1) {
        // Sản phẩm chưa tồn tại trong danh sách, thêm vào
        $scope.compareProducts.push(product);
      } else {
        // Sản phẩm đã tồn tại trong danh sách, xóa ra khỏi danh sách
        $scope.compareProducts.splice(index, 1);
      }
    };
    


  });
