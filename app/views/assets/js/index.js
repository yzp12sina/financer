Finance.App.index = {
  init : () => {
    Finance.App.index.binds();
    Finance.App.index.header();
  },
  binds : () => {
    document.querySelector('.submit-login').addEventListener("click", () => {
      Finance.App.index.Login();
    });
  },
  header : () => {
    //index navbar
    $('header nav a').click(() => {
      let url = $(this).attr('href').replace('#','.content--');
      if($(url).length){
        $('html,body').animate({scrollTop: $(url).offset().top}, 2000);
        $('.menu_mobile--sandwich').removeClass("menu_mobile--sandwich--open");
        $('header nav').removeClass('open');
      }
    });
    //scroll menu change header background-color
    $(window).scroll(() => {
        if($(window).scrollTop()>=300) $("header").addClass("scroll"); else $("header").removeClass("scroll");
    });
    //menu mobile
    $('.menu_mobile--sandwich').on('click', () => {
      $(this).toggleClass("menu_mobile--sandwich--open");
      $('header nav').toggleClass('open');
    });
  },
  Login : () => {
    Finance.Utils.request({
      method : 'POST',
      url : '/api/login/',
      data : {
        login : document.getElementById('login').value,
        password : document.getElementById('password').value
      },
      callback : data => {

      }
    });
  },
  Register : () => {

  }
}

document.addEventListener("DOMContentLoaded", event => {
  Finance.App.index.init();
});
