angular.module('myApp', [])
  .controller('myController', function($scope, $http, $window) {
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


    // Add to cart
    $scope.cartItems = [];
    $scope.count = 0;
    $scope.addToCart = function(product) {
      var cart = {
          "id": product.id,
          "name": product.name,
          "price": product.price,
          "img": product.img1
      }
      // Chuyển đổi đối tượng thành chuỗi JSON và lưu trữ vào localStorage
      $window.localStorage.setItem('cart', JSON.stringify(cart));

      // Lấy chuỗi JSON từ localStorage và chuyển đổi thành đối tượng
      var storedData = $window.localStorage.getItem('cart');
      var cartItems = JSON.parse(storedData);

      console.log(cartItems); 

      if (cartItems !== null) {
        $scope.count++;
        $scope.cartItems.push(cart);
      } 
      
    }
    $scope.showCart = false;
    $scope.showcart = function() {
      $scope.showCart = !$scope.showCart 
    }

    $scope.closeCart = function() {
      $scope.showCart = false; 
    };

    $scope.delete = function(id) {
      // console.log("ID:", id);
      for (var i = 0; i < $scope.cartItems.length; i++) {
        if ($scope.cartItems[i].id === id) {
          $scope.cartItems.splice(i, 1);
          break; 
        }
      }
    };
    

   

  });
