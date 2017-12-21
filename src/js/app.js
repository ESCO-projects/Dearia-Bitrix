import Parallax from 'parallax-js';
import '../../node_modules/fullpage.js/vendors/scrolloverflow.min';
import fullpage from 'fullpage.js';
import '../../node_modules/jquery-countdown/dist/jquery.countdown.min';
import '../../node_modules/svgxuse/svgxuse.min';
import '../../node_modules/magnific-popup/dist/jquery.magnific-popup';
import '../../node_modules/jquery-mask-plugin/dist/jquery.mask.min';

let timelimeMod;

$(document).ready(() => {
  function animateMenu() {
    $('#fp-nav li').each((i, el) => {
      setTimeout(() => {
        $(el).addClass('return_elem');
      }, 100 * i);
    });
  };

  const scene = document.getElementById('parallax_scene');
  const parallaxInstance = new Parallax(scene);
  $('.wrapper').fullpage({
    scrollOverflow: true,
    css3: true,
    easing: 'easeInOutCubic',
    easingcss3: 'ease',
    paddingTop: '0',
    paddingBottom: '0',
    verticalCentered: true,
    navigation: true,
    navigationPosition: 'right',
    menu: '.js_mobile_menu',
    anchors: ['main', 'about', 'problems', 'how', 'get', 'action', 'gmap', 'contacts'],
    navigationTooltips: ['Главная', 'Кто мы', 'Проблемы и решения', 'Как это происходит', 'Что Вы получите', 'Время ограничено', 'Как добраться', 'Контакты'],
    showActiveTooltip: true,
    slidesNavigation: true,
    slidesNavPosition: 'bottom',
    controlArrows: false,
    scrollingSpeed: 500,
    touchSensitivity: 15,
    recordHistory: false,
    //normalScrollElements: '.timeline',
    fixedElements: '.js_move_to,.open_mob_menu,.ms_warning',
    afterRender() {

      $('.js_timer').countdown('2017/12/31 00:00:00', (event) => {
        $('.cou_hours').html(event.strftime('%D'));
        $('.cou_min').html(event.strftime('%H'));
        $('.cou_sec').html(event.strftime('%M'));
      });
      
      function timerFunc() {
        $.magnificPopup.open({
          items: { src: '.timeline' },
            type: 'inline',
            closeOnBgClick: true,
            overflowY: 'auto',
            preloader: false,
            removalDelay: 300,
            showCloseBtn: false,
            fixedContentPos: true,
            fixedBgPos: true,
            mainClass: 'my-mfp-zoom-in',
          callbacks: {
            afterClose() {
              timelimeMod = setTimeout(timerFunc, 60000);
            }
          }
        }, 0);
      }
      $('.js_popup').magnificPopup({
        type: 'inline',
        closeOnBgClick: true,
        overflowY: 'auto',
        preloader: false,
        removalDelay: 300,
        showCloseBtn: false,
        fixedContentPos: true,
        fixedBgPos: true,
        mainClass: 'my-mfp-zoom-in',
        callbacks: {
          beforeOpen() {
            clearTimeout(timelimeMod);
          },
          afterClose() {
            timelimeMod = setTimeout(timerFunc, 60000);
          }
        }
      });
      timelimeMod = setTimeout(timerFunc, 30000);
    },
    onLeave(index, nextIndex, direction) {
      const leavingSection = $(this);
      if (index === 1 && direction === 'down') {
        $('.js_move_to').addClass('scroll_top_visible');
      } else if (index === 2 && direction == 'up') {
        $('.js_move_to').removeClass('scroll_top_visible');
      }
    },
    afterLoad(anchorLink, index) {
      const loadedSection = $(this);
      if (anchorLink === 'main') {
        $('.js_move_to').removeClass('scroll_top_visible');
        $('.head__logo, .head__wrap-scrol').addClass('return_elem');
        setTimeout(() => {
          $('.head__text-wrapper').addClass('return_elem');
        }, 400);
        setTimeout(() => {
          animateMenu();
        }, 800);
        setTimeout(() => {
          $('.parallax_container').addClass('return_elem');
        }, 1200);
      } // end if
      if (anchorLink === 'how') {

      } // end if
      if (anchorLink === 'get') {
        $('.get__icon').each((i, el) => {
          setTimeout(() => {
            $(el).addClass('return_elem animated bounceIn');
          }, 200 * i);
        });
      } // end if
      if (anchorLink === 'problems') {
        $('.problem__step').each((i, el) => {
          setTimeout(() => {
            $(el).addClass('return_elem animated bounceIn');
          }, 200 * i);
        });
      } // end if
      if (anchorLink === 'staff') {
        $('.staff__step').each((i, el) => {
          setTimeout(() => {
            $(el).addClass('return_elem animated bounceIn');
          }, 200 * i);
        });
      } // end if
      if (anchorLink === 'main' || 'about' || 'problems' || 'how' || 'get' || 'action' || 'gmap' || 'contacts') {
        animateMenu();
      } // end if
      if (anchorLink === 'about' || 'problems' || 'how' || 'get' || 'action' || 'gmap' || 'contacts') {

      } // end if
    }
  });/* END fullpage */

  $(document).on('click', '.js_next_slide', () => { $.fn.fullpage.moveSlideRight(); });
  $(document).on('click', '.js_prev_slide', () => { $.fn.fullpage.moveSlideLeft(); });
  $(document).on('click', '.js_move_down', () => { $.fn.fullpage.moveSectionDown(); });
  $(document).on('click', '.js_move_to', () => { $.fn.fullpage.moveTo('main'); });

  $('.js-prob_btn').click(() => { $('.js-hov_list').slideToggle(300); });
  $('.js_mob_open_list').click(() => {
    $('.js_mob_list').slideToggle(300);
    $('.icon-footer_arr').toggleClass('clicked');
  });

  $('.problem__mob-prob-list li').click(function() {
    const tab_id = $(this).attr('data-tab');
    $('.problem__mob-prob-list li').removeClass('bb');
    $('.problem__title h3').removeClass('current_tab');
    $('.problem__list').removeClass('current_tab');
    $('.problem__result--descr').removeClass('current_tab');
    $(this).addClass('bb');
    $(`.${tab_id}`).addClass('current_tab');
  });

  $('ul.js_tab_for li, .js_tab_for img').hover(function() {
    const tab_id = $(this).attr('data-tab');
    $('.problem__title h3').removeClass('current_tab');
    $('.problem__list').removeClass('current_tab');
    $('.problem__result--descr').removeClass('current_tab');
    $(this).addClass('current_tab');
    $(`.${tab_id}`).addClass('current_tab');
  });

  $('.js_close_mod').click(() => {
    $.magnificPopup.close();
  });

  const input = $('.js_input');
  input.focusin(function() {
    const tab_id = $(this).attr('data-input');
    $('.mod__fields label').removeClass('move_label');
    $(`.${tab_id}`).addClass('move_label');
  });

  input.focusout(function() {
    const tab_id = $(this).attr('data-input');
    $(`.${tab_id}`).removeClass('move_label');
  });

    /* START FOR ACTION SEND */
  $('.js_form').submit(function() { // Change
    const th = $(this);
    $.ajax({
      type: 'POST',
      url: 'rest.php',
      data: th.serialize()
    }).done(() => {
      window.location.replace('http://dearia.co.il/thanks.html');
    });
    return false;
  });
  /* END FOR ACTION SEND */

  /* SET MASK TO INPUT */
  $('.js_tel_mask').mask('000-0000000');

  /* FOCUS INPUT ON BLOCK CLICK */
  $('.js_focus_input').click(() => {
    $('.js_focus').focus();
  });

  $('.js_toggle_menu').click(() => {
    $('.menu_lines').toggleClass('active');
    $('.js_mobile_menu').toggleClass('toggle_mnu');
  });

    /* push in modal button value */
  $('a.js_value').click(function() {
    $('.form_id').val($(this).data('form'));
  });

  $('.js_close_popup').click(() => {
    $.magnificPopup.close();
  });

  $('.js_toggle_direction').click(function() {
    $('.js_toggle_panel').toggleClass('show_direct');
    $(this).toggleClass('toggle');
  });

    var hoverOrClick = function () {
        $('.inf_ico').toggleClass('active');
        $('.js_descriptions li').removeClass('active');
        const tab_id = $(this).attr('data-number');
        $(`.${tab_id}`).addClass('active');
    };
    $('.js_step_list li').click(hoverOrClick).hover(hoverOrClick);

    setTimeout(() => { $('.preloader').fadeOut(300); }, 100);


      $('.js_form').submit(function() {
        $(this).find('input.js_input').each(function(){
          if ( $(this).val().length <= 0) {
            $('p.require').fadeIn(100);
           } else if ( $(this).val().length >= 1) {
            $('p.require').fadeOut(100);
            console.log($(this).val().length);
           }
        });
    });

    // Get IE or Edge browser version
    var version = detectIE();

    if (version === false) {
        console.log('hello from console');
    } else if (version <= 13) {
        $('.head__icon,.head__text,.about__title,.how,.how__wrap,.get__top--first,.timer,.timer__wrap').addClass('msbrowser');
        $('.ms_warning').show();
    } else {
        console.log('hello explorer from console');
    }
    function detectIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }
        return false;
    }

});/* END ready(function() */

