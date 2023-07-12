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

// Slick slider
$(document).ready(function() {
    $('.slider-products').slick({
        slidesToShow: 4,
        slidesToScroll: 2,
        isFinite: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        draggable: false,
        prevArrow:"<button type='button' class='slick-prev slick-arrow'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow:"<button type='button' class='slick-next slick-arrow'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
        dots: true
       

    });
  });


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
