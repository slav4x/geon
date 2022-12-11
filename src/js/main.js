/* eslint-disable operator-linebreak */
/* eslint-disable no-inner-declarations */

// const viewportFix = (width) => {
//   const meta = $('meta[name="viewport"]');
//   meta.attr('content', 'user-scalable=no, width=' + (screen.width <= width ? width : 'device-width'));
// };

// viewportFix(375);

Fancybox.bind('[data-fancybox]', {
  dragToClose: false,
  autoFocus: false,
  placeFocusBack: false,
});

const maskPhone = () => {
  const maskedElements = [];
  const el = document.querySelectorAll('.masked');
  if (el.length > 0) {
    const mask = {
      mask: '+7 (000) 000-00-00',
    };
    el.forEach((item) => {
      maskedElements.push(new IMask(item, mask));
    });
  }
  $('.masked').click(function () {
    if ($(this).val() == '') $(this).val('+7 ');
  });
};

maskPhone();

if ($(window).width() >= 610) {
  $(window).scroll(function () {
    const scrolled = $(window).scrollTop();

    if ($('.header').hasClass('header-home'))
      scrolled > 1 ? $('.header').removeClass('header-clear') : $('.header').addClass('header-clear');
  });

  if ($(window).scrollTop() > 1) $('.header').removeClass('header-clear');
} else {
  $('.header').removeClass('header-home');
}

const solutionsMain = new Swiper('.solutions-main', {
  loop: true,
  navigation: {
    nextEl: '.solutions-arrow-next',
    prevEl: '.solutions-arrow-prev',
  },
  pagination: {
    el: '.solutions-increment',
    type: 'fraction',
    formatFractionCurrent: (number) => (number < 10 ? '0' + number : number),
    formatFractionTotal: (number) => (number < 10 ? '0' + number : number),
  },
  noSwiping: true,
  noSwipingClass: 'swiper-slide',
  on: {
    init: function () {
      $('.solutions-next .text-lg').text($('.swiper-slide-next .title-lg').text());
    },
    slideChangeTransitionEnd: function () {
      $('.solutions-next .text-lg').text($('.swiper-slide-next .title-lg').text()).css({ opacity: 1, transition: 'opacity 0.2s' });
    },
    slideChangeTransitionStart: function () {
      $('.solutions-next .text-lg').css({ opacity: 0, transition: 'opacity 0.2s' });
    },
  },
});
const solutionsSecond = new Swiper('.solutions-second__slider', {
  // lazy: true,
  loop: true,
  navigation: {
    nextEl: '.solutions-arrow-next',
    prevEl: '.solutions-arrow-prev',
  },
  thumbs: {
    swiper: solutionsMain,
  },
  noSwiping: true,
  noSwipingClass: 'swiper-slide',
});

// const servicesSlider = new Swiper('.services-slider', {
//   mousewheel: true,
//   slidesPerView: 'auto',
//   freeMode: true,
//   on: {
//     slideChange: function () {
//       setTimeout(function () {
//         servicesSlider.params.touchReleaseOnEdges = false;
//         servicesSlider.params.mousewheel.releaseOnEdges = false;
//       });
//     },
//     reachEnd: function () {
//       setTimeout(function () {
//         servicesSlider.params.touchReleaseOnEdges = true;
//         servicesSlider.params.mousewheel.releaseOnEdges = true;
//       }, 500);
//     },
//     reachBeginning: function () {
//       setTimeout(function () {
//         servicesSlider.params.touchReleaseOnEdges = true;
//         servicesSlider.params.mousewheel.releaseOnEdges = true;
//       }, 500);
//     },
//   },
// });
