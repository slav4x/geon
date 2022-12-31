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
  $(this).toggleClass('open');
  if ($(this).hasClass('open')) {
    $(this).find('.services-faq__text').slideToggle(300);
  } else {
    $('.services-faq__item').find('.services-faq__text').slideUp(300);
  }
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

  $('.services-left').addClass('focus');

  const elIndex = $(this).index();
  $('.services-left img.active').removeClass('active');
  $('.services-left img').eq(elIndex).addClass('active');
}
$('.services-list a').bind('mouseenter', servicesFadeIn);

$('.solutions-section').each(function (i, el) {
  function solutionsFadeIn() {
    const elIndex = $(this).index();
    $('.solutions-section__image img.active', el).removeClass('active');
    $('.solutions-section__image img', el).eq(elIndex).addClass('active');
  }
  $('.solutions-section__image img', el).eq(0).addClass('active');
  $('.solutions-section__list li', el).bind('mouseenter', solutionsFadeIn);
});

function stepsFadeIn() {
  const elIndex = $(this).index();
  $('.services-steps__images img.active').removeClass('active');
  $('.services-steps__images img').eq(elIndex).addClass('active');
}
$('.services-steps__images img').eq(0).addClass('active');
$('.services-steps__list li').bind('mouseenter', stepsFadeIn);

$('.catalog-grid__switch li').click(function () {
  const grid = $(this).attr('data-grid');

  $('.catalog-grid__switch li').removeClass('active');
  $(this).addClass('active');

  $('.catalog-grid')
    .removeClass()
    .addClass('catalog-grid ' + grid);
});

const h = $('.catalog-sort p').css('height');
$('.catalog-sort p').css('height', h);

$('.catalog-sort').click(function () {
  $(this).toggleClass('active');

  const items = $('.catalog-item');
  const arItems = $.makeArray(items);
  arItems.sort(function (a, b) {
    let par;

    if ($('.catalog-sort').hasClass('active')) {
      par = $(b).data('price') - $(a).data('price');
    } else {
      par = $(a).data('price') - $(b).data('price');
    }
    return par;
  });
  $(arItems).appendTo('.catalog-grid');
});

const triplets = (number) => number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

$('.triplets').each((i, el) => {
  const price = parseInt($(el).text());
  $(el).text(triplets(price));
});

$('.catalog-item').each((i, el) => {
  const price = parseInt($(el).data('price'));
  $('.catalog-item__price', el).text(triplets(price));
});

if ($('.company-work').length !== 0) $('.wrapper').css('overflow', 'unset');

const projectsGallerySlider = new Swiper('.projects-gallery__slider', {
  speed: 1000,
  spaceBetween: 15,
  navigation: {
    nextEl: '.projects-gallery__arrow-next',
    prevEl: '.projects-gallery__arrow-prev',
  },
  pagination: {
    el: '.projects-gallery__increment',
    type: 'fraction',
    formatFractionCurrent: (number) => (number < 10 ? '0' + number : number),
    formatFractionTotal: (number) => (number < 10 ? '0' + number : number),
  },
});

const projectsItemSlider = new Swiper('.projects-equipment__slider', {
  speed: 1000,
  spaceBetween: 15,
  slidesPerView: 1,
  navigation: {
    nextEl: '.projects-equipment__arrow-next',
    prevEl: '.projects-equipment__arrow-prev',
  },
  pagination: {
    el: '.projects-equipment__increment',
    type: 'fraction',
    formatFractionCurrent: (number) => (number < 10 ? '0' + number : number),
    formatFractionTotal: (number) => (number < 10 ? '0' + number : number),
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
  },
});

if ($('.item-nav').length !== 0) $('.wrapper').css('overflow', 'unset');

const itemGallery = new Swiper('.item-gallery', {
  speed: 1000,
  spaceBetween: 15,
  slidesPerView: 1,
  navigation: {
    nextEl: '.item-gallery__arrow-next',
    prevEl: '.item-gallery__arrow-prev',
  },
  pagination: {
    el: '.item-gallery__increment',
    type: 'fraction',
    formatFractionCurrent: (number) => (number < 10 ? '0' + number : number),
    formatFractionTotal: (number) => (number < 10 ? '0' + number : number),
  },
});

const itemNav = [];
const itemSection = $('.item-section');

itemSection.each((i, el) => {
  const title = $(el).find('.item-section__title').text();
  $(el).attr('data-id', i);
  itemNav.push(title);

  if (title === 'Описание') $(el).attr('id', 'description');
});

itemNav.forEach((title, i) => {
  $('.item-nav').append(`<li data-id="${i}"><a href="javascript:;">${title}</a></li>`);
});

$('.item-nav li').on('click', function (event) {
  event.preventDefault();
  const id = $(this).attr('data-id');
  $('html, body').animate(
    {
      scrollTop: $(`.item-section[data-id="${id}"]`).offset().top - $('.header').outerHeight(),
    },
    1000
  );
});

$('.item-card__desc-more').on('click', function (event) {
  event.preventDefault();
  const id = $(this).attr('href');
  $('html, body').animate(
    {
      scrollTop: $(id).offset().top - $('.header').outerHeight(),
    },
    1000
  );
});

$(window).on('scroll', () => {
  const position = $(this).scrollTop() + $('.header').outerHeight();

  itemSection.each(function () {
    const top = $(this).offset().top - $('.header').outerHeight();
    const bottom = top + $(this).outerHeight();

    if (position >= top && position <= bottom) {
      $('.item-nav li').removeClass('active');
      $(`.item-nav li[data-id="${$(this).attr('data-id')}"]`).addClass('active');
    } else if (position < $('.item-wrapper').offset().top) {
      $('.item-nav li').removeClass('active');
    }
  });

  if (position > $('.item-wrapper').offset().top) {
    $('.item-card.fixed').css('opacity', '1');
  } else {
    $('.item-card.fixed').css('opacity', '0');
  }
});
