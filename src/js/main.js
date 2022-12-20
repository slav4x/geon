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
  speed: 1000,
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
  speed: 1000,
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

const scrollSlider = () => {
  const services = $('.services');

  if (services.length !== 0) {
    const servicesTop = services.offset().top;
    const servicesHeight = services.innerHeight();

    const servicesContainer = $('.services .container');
    const servicesContainerWidth = servicesContainer.width();
    const servicesContainerHeight = servicesContainer.height();

    const servicesSliderWrapper = $('.services-slider__wrapper');
    const servicesSliderWrapperWidth = servicesSliderWrapper.innerWidth();

    services.css('height', servicesSliderWrapperWidth - servicesContainerWidth + servicesHeight);

    $(window).scroll(() => {
      const scroll = $(window).scrollTop();
      const versus = scroll + $(window).height() - (servicesTop + parseInt(services.css('padding-top')) + servicesContainerHeight);

      let pos = versus;
      let img;

      if (versus >= 0) {
        img = -130 + (pos / 100) * 13;
        if (versus >= servicesSliderWrapperWidth - servicesContainerWidth) {
          pos = servicesSliderWrapperWidth - servicesContainerWidth;
          img = -130 + (pos / 100) * 13;
        }
      } else {
        pos = 0;
      }

      servicesSliderWrapper.css('transform', `translate3d(-${pos}px, 0, 0)`);
      servicesContainer.css('transform', `translate3d(0, ${pos}px, 0)`);

      $('.services-item__img img').each(function (i, el) {
        $(el).css('transform', `translate3d(${img}px, 0, 0) scale(1.5)`);
      });
    });
  }
};

$(document).ready(function () {
  if ($('body').width() < 768) {
    $('.services-item').css('width', $('.services .container').width());
  } else {
    scrollSlider();
  }
});

const projectsSlider = new Swiper('.projects-slider', {
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.projects-arrow-next',
    prevEl: '.projects-arrow-prev',
  },
  pagination: {
    el: '.projects-increment',
    type: 'fraction',
    formatFractionCurrent: (number) => (number < 10 ? '0' + number : number),
    formatFractionTotal: (number) => (number < 10 ? '0' + number : number),
  },
  noSwiping: true,
  noSwipingClass: 'swiper-slide',
});

$('[data-counter]').each(function (i, el) {
  const num = $(el).text();
  const numArr = [...('' + num)];

  $(el).html('<span class="idle"></span><span class="hover"></span>');

  $(el)
    .find('.idle')
    .html(numArr.map((e) => `<span class="char">${e}</span>`));
  $(el)
    .find('.hover')
    .html(numArr.map((e) => `<span class="char">${e}</span>`));

  $(window).scroll(function () {
    const scrolled = $(window).scrollTop() + $(window).height() - 100;
    if (scrolled > $(el).offset().top) $(el).addClass('is-inview');
  });
});

$('.contact-open').click(function () {
  $(this).toggleClass('open');
  $('.contact-map').slideToggle();
});

$('.btn-up').on('click', function (event) {
  event.preventDefault();
  $('html, body').animate(
    {
      scrollTop: $('body').offset().top,
    },
    1000
  );
});

$('.services-list a').hover(
  function () {
    $(this).find('.text-lg').slideDown(200);
    const elIndex = $(this).index();
    $('.services-left img').eq(elIndex).fadeIn(200);
  },
  function () {
    $(this).find('.text-lg').slideUp(200);
    const elIndex = $(this).index();
    $('.services-left img').eq(elIndex).fadeOut(400);
  }
);

$('.js-hover-link').each(function (i, el) {
  const height = $(el).height();
  $(el).css('height', height);

  const name = $(el).text();
  $(el).html(`<span>${name}</span><span>${name}</span>`);
});

$('input').each(function (i, el) {
  $(el).click(function () {
    $(this).val() !== '' ? $(this).closest('label').addClass('fill') : $(this).closest('label').removeClass('fill');
  });
  $(el).change(function () {
    $(this).val() !== '' ? $(this).closest('label').addClass('fill') : $(this).closest('label').removeClass('fill');
  });
});

$('.projects-item__title').each(function (i, el) {
  const title = $(el).text().split(' ');
  $(el).html(title.map((e) => `<span>${e}</span>`));
});

let isOpen = false;
$('.header-burger').click(function () {
  isOpen = !isOpen;

  $('.header-opened').toggleClass('open');
  $('.header-logo').toggleClass('white');

  if ($('body').width() < 1024) isOpen ? $('body').css('overflow', 'hidden') : $('body').css('overflow', 'visible');
});

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};
window.addEventListener('resize', appHeight);
appHeight();

$('.js-team-show').click(function () {
  $(this).fadeToggle(200);
  $('.company-team__item').each((i, el) => ($(el).css('display') === 'none' ? $(el).fadeToggle(200) : ''));
});
