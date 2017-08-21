    $(function(){
      $('#portfolio').mixItUp();
    });


  jQuery(function($) {
      //Initiat WOW JS
      new WOW().init();

      // one page navigation 
      $('.main-navigation').onePageNav({
              currentClass: 'active'
      });    
  });



$('.carousel').carousel({
        interval: 5000 //changes the speed
    });
   
    $(function() {
  $(".expand").on( "click", function() {
    // $(this).next().slideToggle(200);
    $expand = $(this).find(">:first-child");
    if($expand.text() == "+") {
      $expand.text("-");
    } else {
      $expand.text("+");
    }
  });
});
  
  
  // Add smooth scrolling to all links
function scrollNav() {
  $('.nav a').click(function(){  
    //Toggle Class
    $(".scrollup").removeClass("scrollup");      
    $(this).closest('li').addClass("scrollup");
    var theClass = $(this).attr("class");
    $('.'+theClass).parent('li').addClass('scrollup');
    //Animate
    $('html, body').stop().animate({
        scrollTop: $( $(this).attr('href') ).offset().top - 40
    }, 400);
    return false;
  });
  $('.scrollTop a').scrollTop();
}
scrollNav();

/* 
   Page Loader
   ========================================================================== */
   $(window).load(function() {
    "use strict";
    $('#loader').fadeOut();
   });