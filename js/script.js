$(document).ready(function(){
  //SlickSlider
  $('.carousel__inner').slick({
      speed: 1200,
      adaptiveHeight: false,
      prevArrow: '<button type="button" class="slick-prev"><img src="img/prev.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="img/next.png"></button>',
      responsive: [
          {
              breakpoint: 824,
              settings: {
                  dots: true,
                  arrows: false
              }
          }
      ]
  });
  //Tabs
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });
  //Product cards change
  function toggleSlide(item) {
      $(item).each(function(i) {
          $(this).on('click', function(e) {
              e.preventDefault();
              $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
              $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          })
      });
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  //Modal
  //consultation pop-up
  $('[data-modal="consultation"]').on('click', function(){
    $('.overlay, #consultation').fadeIn('fast');
  });
  //pop-ups closing
  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut('fast');
  });
  //pop-up after order
  //changing name of ordered product
  $('.button_mini').each(function(i){
    $(this).on('click', function(){
      $('#order .modal__description').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('fast');
    });
  });
  //closing on Esc button
  document.addEventListener('keydown',(e)=>{
    if (e.code === "Escape"){
      $('#consultation, #order, .overlay').fadeOut('fast');
    }
  });

  //closing on outer area
  const overlay = document.querySelector('.overlay');
  overlay.addEventListener('click', (e)=>{
    if (e.target === overlay){
      $('#consultation, #order, .overlay').fadeOut('fast');
    }
  });

  //Forms validation
  function validateForms (form){
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
  
      messages: {
        name: "Пожалуйста, введите свое имя",
        phone: "Пожалуйста, введите свой телефон",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Адрес почты введен неправильно"
        }
      }
    });
  };

  validateForms ('#consultation-form');
  validateForms ('#consultation form');
  validateForms ('#order form');
  
  //masked input
  $('input[name=phone]').mask("+38 (999) 999-9999");

  // Reset inputs after sending
  $('form').submit(function(e) {
    e.preventDefault();

    if (!$(this).valid()){
      return;
    }

    $(this).find("input").val("");
    $('#consultation, #order').fadeOut();
    $('.overlay, #thanks').fadeIn('slow');

    $('form').trigger('reset');

  });

  //scroll & pageup

  $(window).scroll(function() {

    if ($(this).scrollTop()> 1400 ) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    };

  });

  new WOW().init();
});


