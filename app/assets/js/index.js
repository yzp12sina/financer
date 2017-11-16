//index navbar
$('header nav a').click(function(){
  var _this = this;
  var url = $(_this).attr('href').replace('#','.content--');
  if($(url).length)
    $('html,body').animate({scrollTop: $(url).offset().top}, 2000);
});
