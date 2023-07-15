app.directive('slickSlider', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      $(element).slick({
        slidesToShow: 4,
        slidesToScroll: 2,
        isFinite: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        draggable: false,
        prevArrow:"<button type='button' class='slick-prev slick-arrow'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow:"<button type='button' class='slick-next slick-arrow'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
        dots: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              arrows: false,
              isFinite: false
            }
          }           
        ]
      });
    }
  };
})
.controller('myController', function($scope, $http, $window, $routeParams) {
    $http.get('products.json')
      .then(function(response) {
        $scope.products = response.data;
        $scope.id = $routeParams.id;
        $scope.name = $routeParams.name;
        $scope.productDetails = $scope.products.find(function(product) {
            return product.id === parseInt($scope.id) && product.name === $scope.name;
        });
      });

    // img ID
    $scope.filterByIds = function(ids) {
      return function(product) {
        return ids.indexOf(product.id) !== -1;
      };
    };
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

   // btn up down
   $scope.downquantity = function(item) {
    if (item.quantity > 1) {
      item.quantity--;
      $scope.updateQuantity(item);
      $scope.calculateTotalPrice();
    }
  }
  $scope.upquantity = function(item) {
    item.quantity++;
    $scope.updateQuantity(item);
    $scope.calculateTotalPrice();

  }
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
       
      var existingProductIndex = $scope.cartItems.findIndex(function(item) {
        return item.id === product.id;
      });
    
      if (existingProductIndex !== -1) {
        $scope.cartItems[existingProductIndex].quantity++;
      } else {
        var cart = {
          "id": product.id,
          "name": product.name,
          "price": product.price,
          "img": product.img1,
          "quantity": 1,
          "img1": product.img1,
          "img2": product.img2,
          "img3": product.img3,
          "img4": product.img4,
          "img5": product.img5,
          "desc": product.desc
        };
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
        var copyItem = angular.copy(item);
        copyItem.quantity = item.quantity;
        $scope.cartItems[index] = angular.extend({}, copyItem);
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
   
    $scope.returnHome = function() {
      alert('Thank you for your purchase, Orders will be shipped in the next 1-2 days.')
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
           "brand": product.brand,
           "desc": product.desc,
           "img": product.img1
       };
        var existingProductIndex = $scope.productCompare.findIndex(function(item) {
          return item.id === cart.id;
        });

        if (existingProductIndex !== -1) {
          $scope.productCompare.splice(existingProductIndex, 1);
          $scope.compareCount--;
        } else if (cart !== null && $scope.compareCount < 3) {
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
  // Show table
  $scope.showTable = false;
  $scope.showtable = function() {
    $scope.showTable = true;
  }
  $scope.closetablecompare = function() {
    $scope.showTable = false;
  }
  // change img
  $scope.mainImgIndex = 1;
  $scope.changeMainImg = function(index){
    $scope.mainImgIndex = index;
  }
  $scope.prevImg = function() {
      $scope.mainImgIndex--;  
  }
  $scope.nextImg = function() {
      $scope.mainImgIndex++;
  }
  // Desc + review
  $scope.desc = true;
  $scope.review = false;
  $scope.displayDesc = function() {
    $scope.desc = true;
    $scope.review = false;
  }
  $scope.displayReview = function() {
    $scope.desc = false;
    $scope.review = true;
  }
  // infor customers
  $scope.customers = [];
  if (sessionStorage.getItem('customers')) {
    $scope.customers = angular.fromJson(sessionStorage.getItem('customers'));
  }
  var uid = 1;
  $scope.addCustomers = function() {
    if ($scope.customer.id == null) {
      $scope.customer.id = uid++;
      $scope.customers.push($scope.customer)
    }
    console.log($scope.customers);
    sessionStorage.setItem('customers',angular.toJson($scope.customers))
  }
  $scope.admin = 'asd';
});

