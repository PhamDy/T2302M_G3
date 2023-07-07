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
    // Hàm tính subTotal
    $scope.calculateSubTotal = function(item) {
      return item.quantity * item.price;
    };
    // Hàm tính tổng giá trị
    $scope.totalPrice = 0;
    if (sessionStorage.getItem('totalPrice')) {
      $scope.totalPrice = parseFloat(sessionStorage.getItem('totalPrice'));
    }
    $scope.calculateTotalPrice = function() {
      $scope.totalPrice = 0;
      for (var i = 0; i < $scope.cartItems.length; i++) {
        var item = $scope.cartItems[i];
        if (item.quantity && item.price) {
          item.subTotal = $scope.calculateSubTotal(item); 
          $scope.totalPrice += item.subTotal;
        }
      }
      sessionStorage.setItem('totalPrice', $scope.totalPrice.toString());
    };
    
    // Thêm vào giỏ hàng
    $scope.cartItems = [];
    if (sessionStorage.getItem('cartItems')) {
      $scope.cartItems = angular.fromJson(sessionStorage.getItem('cartItems'));
    }
    $scope.count = 0;
    if (sessionStorage.getItem('count')) {
      $scope.count = angular.fromJson(sessionStorage.getItem('count'));
    }
    $scope.addToCart = function(product) {
      var cart = {
          "id": product.id,
          "name": product.name,
          "price": product.price,
          "img": product.img1,
          "quantity": 1
      };
      if (cart !== null) {
        $scope.cartItems.push(cart);
        $scope.count = $scope.cartItems.length;
      }       
      sessionStorage.setItem('cartItems',angular.toJson($scope.cartItems))
      sessionStorage.setItem('count',angular.toJson($scope.count))
      console.log($scope.cartItems)
      $scope.calculateTotalPrice();
      console.log($scope.totalPrice);
    }
    
    // Show cart
    $scope.showCart = false;
    $scope.showcart = function() {
      $scope.showCart = !$scope.showCart 
    }

    $scope.closeCart = function() {
      $scope.showCart = false; 
    };
    
    // Delete product
    $scope.delete = function(id) {
      for (var i = 0; i < $scope.cartItems.length; i++) {
        if ($scope.cartItems[i].id === id) {
          $scope.cartItems.splice(i, 1);
          break; 
        }
      }
      // Cập nhật số lượng
    $scope.count = $scope.cartItems.length;
    $scope.calculateTotalPrice();
    console.log($scope.totalPrice);
    sessionStorage.setItem('count',angular.toJson($scope.count))
    sessionStorage.setItem('cartItems', angular.toJson($scope.cartItems));
    };
    // Update quantity
    $scope.updateQuantity = function(item) {       
        var index = $scope.cartItems.indexOf(item);
      if (index !== -1) {
        $scope.cartItems[index].quantity = item.quantity;
        sessionStorage.setItem('cartItems', angular.toJson($scope.cartItems));
        sessionStorage.setItem('quantity', item.quantity.toString());
      }
      $scope.calculateTotalPrice();
    };

    $scope.shipping = 4.00;
    $scope.total = $scope.shipping + $scope.totalPrice;
    $scope.calculateTotal = function() {
      $scope.total = $scope.shipping + $scope.totalPrice;
    };
    
    $scope.$watch('totalPrice', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        $scope.calculateTotal();
        sessionStorage.setItem('total', $scope.total.toString());
      }
    });
   
    $scope.placeOrder = function() {
      alert('Order Success. Orders will be shipped in the next 1-2 days.')
    }

    $scope.returnHome = function() {
      alert('Thank you for your purchase, it is a pleasure to serve you')
  }

  // Compare
    $scope.showChoice = false;
    $scope.closechoice = function() {
      $scope.showChoice = false; 
    };

  // Add products compare
    $scope.productCompare = [];
    $scope.compareCount = 0;
    $scope.showchoice = function(product) {
      $scope.showChoice = true;
      var cart = {
           "id": product.id,
           "name": product.name,
           "price": product.price,
           "color": product.color,
           "sold": product.sold,
           "quantity": product.quantity,
           "size": product.size,
           "categories": product.categories,
           "desc": product.desc,
           "img": product.img1
       };
       if (cart !== null && $scope.compareCount < 3) {
         $scope.productCompare.push(cart);
         $scope.compareCount++;
       }       
       console.log($scope.productCompare)
     }
     // Delete products compare
     $scope.deleteCompare = function(id) {
      for (var i = 0; i < $scope.productCompare.length; i++) {
        if ($scope.productCompare[i].id === id) {
          $scope.productCompare.splice(i, 1);
          $scope.compareCount--;
          break; 
        }
      }
     }
     
});
