//index navbar
$('header nav a').click(function(){
  var url = $(this).attr('href').replace('#','.content--');
  if($(url).length){
    $('html,body').animate({scrollTop: $(url).offset().top}, 2000);
    $('.menu_mobile--sandwich').removeClass("menu_mobile--sandwich--open");
    $('header nav').removeClass('open');
  }

});
//scroll menu change header background-color
$(window).scroll(function(){
    if($(window).scrollTop()>=300) $("header").addClass("scroll"); else $("header").removeClass("scroll");
});
//menu mobile
$('.menu_mobile--sandwich').on('click', function(){
  $(this).toggleClass("menu_mobile--sandwich--open");
  $('header nav').toggleClass('open');
  // $('nav').toggleClass('navbar-open');
  // $('header').toggleClass('fixed');
})
