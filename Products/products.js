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
