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
        dots: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3
              },
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                arrows: false,
                isFinite: false,
              }
            }           
          ]

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
        }, 1000); 
    });
});
