/* eslint-disable operator-linebreak */
/* eslint-disable no-inner-declarations */

const viewportFix = (width) => {
  const meta = $('meta[name="viewport"]');
  meta.attr('content', 'user-scalable=no, width=' + (screen.width <= width ? width : 'device-width'));
};

viewportFix(380);

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
    $('.wrapper').css('overflow', 'unset');

    const servicesTop = services.offset().top;
    const servicesHeight = services.innerHeight();

    const servicesContainer = $('.services .container');
    const servicesContainerWidth = servicesContainer.width();
    const servicesContainerHeight = servicesContainer.height();

    const servicesSliderWrapper = $('.services-slider__wrapper');
    const servicesSliderWrapperWidth = servicesSliderWrapper.innerWidth();

    services.css('height', servicesSliderWrapperWidth - servicesContainerWidth + servicesHeight);

    servicesContainer.css('top', $(window).height() - servicesContainerHeight - 40);

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
      // servicesContainer.css('transform', `translate3d(0, ${pos}px, 0)`);

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

  $('.header-burger').toggleClass('open');
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

const companyBrands = new Swiper('.company-brands__slider', {
  slidesPerView: 'auto',
  allowTouchMove: false,
  navigation: {
    nextEl: '.company-arrow-next',
    prevEl: '.company-arrow-prev',
  },
  pagination: {
    el: '.company-brands__progressbar',
    type: 'progressbar',
  },
});

$('.services-faq__item').click(function () {
  $('.services-faq__item').find('.services-faq__text').slideUp(300);
  $(this).find('.services-faq__text').slideToggle(300);
  $(this).toggleClass('open');
});

const newsPage = $('.news');
if (newsPage.length !== 0) $('.wrapper').css('overflow', 'unset');

$('.news-nav a').on('click', function (event) {
  const target = $(this).attr('href');
  event.preventDefault();
  $('html, body').animate(
    {
      scrollTop: $(target).offset().top - 120,
    },
    1000
  );
});

function servicesFadeIn() {
  $('.services-list .text-lg').stop().slideUp(250);
  $(this).find('.text-lg').stop().slideDown(250);

  const elIndex = $(this).index();

  $('.services-left__placeholder').css('top', '0');

  setTimeout(() => {
    $('.services-left').addClass('focus');

    $('.services-left__placeholder').css('top', '100%');

    $('.services-left img').removeClass('focus');
    $('.services-left img').eq(elIndex).addClass('focus');
  }, 400);
}

$('.services-list a').bind('mouseenter', servicesFadeIn);

$('.solutions-section').each(function (i, el) {
  function solutionsFadeIn() {
    const elIndex = $(this).index();

    $('.services-left__placeholder', el).css('top', '0');

    setTimeout(() => {
      $('.services-left__placeholder', el).css('top', '100%');

      $('.solutions-section__image img', el).removeClass('focus');
      $('.solutions-section__image img', el).eq(elIndex).addClass('focus');
    }, 400);
  }

  $('.solutions-section__list li', el).bind('mouseenter', solutionsFadeIn);
});

function stepsFadeIn() {
  $('.services-steps__list li').removeClass('active');
  $(this).addClass('active');

  const elIndex = $(this).index();

  $('.services-left__placeholder').css('top', '0');

  setTimeout(() => {
    $('.services-left__placeholder').css('top', '100%');

    $('.services-steps__images img').removeClass('focus');
    $('.services-steps__images img').eq(elIndex).addClass('focus');
  }, 400);
}

$('.services-steps__list li').bind('mouseenter', stepsFadeIn);
$('.services-steps__images img').eq(0).addClass('focus');

$('.catalog-grid__switch li').click(function () {
  const grid = $(this).attr('data-grid');

  $('.catalog-grid__switch li').removeClass('active');
  $(this).addClass('active');

  $('.catalog-grid')
    .removeClass()
    .addClass('catalog-grid ' + grid);
});
