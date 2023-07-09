// Add class='sticky' for header
$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop()) {
            $('header').addClass('sticky');
        } else {
          $('header').removeClass('sticky');
        }
    });
});  
  
var addToCartButtons = document.querySelectorAll('.btn-add');
var cartCountElement = document.getElementById('cartCount');
var cartCount = 0;

// Lặp qua tất cả các nút "Add to cart"



  // Back to Top
  $(document).ready(function(){
    $(window).scroll(function(){
        if($(this).scrollTop() > 900){
            $('#backtop').fadeIn();
        } else {
            $('#backtop').fadeOut();
        }
    });
    $("#backtop").click(function(){
        $('html, body').animate({
            scrollTop: 0
        }, 2000); 
    });
});
