/* eslint-disable indent */
/* eslint-disable operator-linebreak */
/* eslint-disable no-inner-declarations */

/*
 * FUNCTIONS *
 */

Fancybox.bind('[data-fancybox]', {
  dragToClose: false,
  autoFocus: false,
  placeFocusBack: false,
});

const viewportFix = (width) => {
  const meta = $('meta[name="viewport"]');
  meta.attr('content', 'user-scalable=no, width=' + (screen.width <= width ? width : 'device-width'));
};

const triplets = (number) => number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

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

const initPopup = () => {
  $('[data-open-popup]').click(function () {
    const popup = $(this).attr('data-open-popup');
    $('body').css('overflow', 'hidden');
    $(`.popup[data-popup="${popup}"]`).addClass('open');

    if (popup === 'popup-sertificate') {
      const title = $(this).parent().find('h3').text();
      const file = $(this).attr('data-file');
      $(`.popup[data-popup="${popup}"]`).find('h3.title-lg').text(title);
      $(`.popup[data-popup="${popup}"]`).find('input[name="urlfile"]').val(file);
    }
  });

  $('.popup-close, .popup-bg').click(() => {
    $('.popup').removeClass('open');
    $('body').removeAttr('style');
  });
};

const lineCampItemText = () => {
  const itemDesc = $('.item-card__desc div');

  const itemDescHeight = itemDesc.outerHeight();
  if (itemDescHeight === 0) $('.item-card__desc').hide();

  const itemDescFontSize = parseInt(itemDesc.css('font-size'));
  const itemDescLineHeight = 1.6;
  let itemDescLineCamp = Math.floor(itemDescHeight / (itemDescFontSize * itemDescLineHeight));
  if (itemDescLineCamp > 12) itemDescLineCamp = 12;

  const itemDescWrapper = (i) => i * (itemDescFontSize * itemDescLineHeight);
  const itemDescOptions = () => {
    if ($(window).width() > 1024) {
      return {
        '-webkit-line-clamp': `${itemDescLineCamp}`,
        height: `${itemDescWrapper(itemDescLineCamp)}px`,
      };
    }
    return {
      '-webkit-line-clamp': `3`,
      height: `${itemDescWrapper(3)}px`,
    };
  };

  itemDesc.css(itemDescOptions());
};

const scrollSlider = () => {
  const services = $('.services');

  const servicesTop = services.offset().top;
  const servicesHeight = services.innerHeight();

  const servicesContainer = $('.services .container');
  const servicesContainerWidth = servicesContainer.width();
  const servicesContainerHeight = servicesContainer.height();

  const servicesSliderWrapper = $('.services-slider__wrapper');
  const servicesSliderWrapperWidth = servicesSliderWrapper.innerWidth();

  if ($('body').width() > 768) {
    services.css('height', servicesSliderWrapperWidth - servicesContainerWidth + servicesHeight);
    servicesContainer.css('top', $(window).height() - servicesContainerHeight - 40);

    $(window).scroll(() => {
      const scroll = $(window).scrollTop();
      const versus = scroll + $(window).height() - (servicesTop + parseInt(services.css('padding-top')) + servicesContainerHeight);

      let pos = versus;
      let img;

      if (versus >= 0) {
        img = (pos / 100) * 5.2;
        if (versus >= servicesSliderWrapperWidth - servicesContainerWidth) {
          pos = servicesSliderWrapperWidth - servicesContainerWidth;
          img = (pos / 100) * 5.2;
        }
      } else {
        pos = 0;
      }

      servicesSliderWrapper.css('transform', `translate3d(-${pos}px, 0, 0)`);

      $('.services-item__img img').each(function (i, el) {
        $(el).css('transform', `translate3d(${img * -1}px, 0, 0)`);
      });
    });
  } else {
    $('.services-item').css('width', $('.services .container').width());
  }
};

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};

const itemSingle = () => {
  const itemNav = [];
  const itemSection = $('.item-section');

  itemSection.each((i, el) => {
    const title = $(el).find('.item-section__title').text();
    $(el).attr('data-id', i);
    itemNav.push(title);

    if (title === 'Описание') $(el).attr('id', 'description');
  });

  itemNav.forEach((title, i) => {
    $('.item-nav ul').append(`<li data-id="${i}"><a href="javascript:;">${title}</a></li>`);
  });

  $('.item-nav li').on('click', function () {
    const id = $(this).attr('data-id');
    const top = $(`.item-section[data-id="${id}"]`).offset().top - $('.header').outerHeight();

    $('html, body').animate({ scrollTop: top }, 1000);
  });

  $('.item-card__desc-more').on('click', () => {
    $('html, body').animate({ scrollTop: $('#description').offset().top - $('.header').outerHeight() }, 1000);
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
};

const burgerMenu = () => {
  let isOpen = false;
  $('.header-burger').click(function () {
    isOpen = !isOpen;

    $('.header-burger').toggleClass('open');
    $('.header-opened').toggleClass('open');
    $('.header-logo').toggleClass('white');

    if ($('body').width() < 1024) isOpen ? $('body').css('overflow', 'hidden') : $('body').css('overflow', 'visible');
  });
};

const companyWorkChange = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const item = entry.target;
          const id = item.getAttribute('data-id');

          const imgs = document.querySelectorAll('.company-work__images img');
          imgs.forEach((i) => {
            i.style.zIndex = 2;
            i.style.top = '100%';
          });

          const img = document.querySelector('.company-work__images img:nth-child(' + id + ')');
          img.style.zIndex = 5;
          img.style.top = '0%';
        }
      });
    },
    {
      root: null,
      rootMargin: '200px',
      threshold: 1,
    }
  );

  const arr = document.querySelectorAll('.company-work__item');
  arr.forEach((i) => {
    observer.observe(i);
  });
};

const createSlider = (el, params) => {
  if ($(el).length) {
    const slider = new Swiper(el, {
      observer: true,
      observeParents: true,
      ...params,
    });
  }
};

let lenis;
const initSmoothScrolling = () => {
  lenis = new Lenis({
    lerp: 0.2,
    smooth: true,
    duration: 2,
  });

  const scrollFn = (time) => {
    lenis.raf(time);
    requestAnimationFrame(scrollFn);
  };

  requestAnimationFrame(scrollFn);
};

const runSplit = () => {
  let typeSplit;
  gsap.registerPlugin(ScrollTrigger);
  const splitText = document.querySelectorAll('[data-animate-title]');

  splitText.forEach((text) => {
    $(text).splitLines();

    let splitTextDelay = 0;

    if (text.hasAttribute('data-animate-title-delay')) {
      splitTextDelay = text.getAttribute('data-animate-title-delay');
    }

    gsap.utils.toArray(text).forEach((split) => {
      gsap.from($(text).children(), {
        scrollTrigger: {
          trigger: split,
          start: 'top 85%',
        },
        opacity: 0,
        y: 40,
        duration: 0.15,
        delay: splitTextDelay,
        stagger: { amount: 0.3 },
      });
    });
  });
};

const initAnimate = () => {
  runSplit();
  initSmoothScrolling();

  setTimeout(function () {
    AOS.init({
      once: true,
      offset: 40,
      duration: 400,
      delay: 200,
    });
  }, 100);
};

$(document).ready(function () {
  /*
   * FUNCTIONS INIT *
   */

  const init = () => {
    viewportFix(380);
    appHeight();
    maskPhone();
    initPopup();
    burgerMenu();
    initAnimate();
  };

  init();

  if ($('.item-card__desc').length !== 0) lineCampItemText();
  if ($('.services').length !== 0) scrollSlider();
  if ($('.item-wrapper').length !== 0) itemSingle();
  if ($('.company-work').length !== 0) companyWorkChange();

  if ($('.unset').length !== 0) $('.wrapper').css('overflow', 'unset');

  /*
   * SLIDERS *
   */

  createSlider('.item-gallery', {
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

  createSlider('.projects-equipment__slider', {
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

  createSlider('.projects-gallery__slider', {
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

  createSlider('.company-brands__slider', {
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

  const projectsSlider = document.querySelector('.projects-slider');
  if (!!projectsSlider) {
    const slider = new Swiper(projectsSlider, {
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 4000,
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

    const observerProjects = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => (entry.isIntersecting ? slider.autoplay.start() : slider.autoplay.stop()), {
        root: null,
        rootMargin: '150px',
        threshold: 1,
      });
    });

    observerProjects.observe(projectsSlider);
  }

  const solutionsSlider = document.querySelector('.solutions-main');
  if (!!solutionsSlider) {
    const solutionsMain = new Swiper(solutionsSlider, {
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
  }

  /*
   * OTHERS *
   */

  if ($(window).width() >= 610) {
    $(window).scroll(function () {
      const scrolled = $(window).scrollTop();

      if ($('.header').hasClass('header-home')) {
        scrolled > 1 ? $('.header').removeClass('header-clear') : $('.header').addClass('header-clear');
      }
    });

    if ($(window).scrollTop() > 1) $('.header').removeClass('header-clear');
  } else {
    $('.header').removeClass('header-home');
  }

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
      const scrolled = $(window).scrollTop() + $(window).height() - 160;
      if (scrolled > $(el).offset().top) $(el).addClass('is-inview');
    });
  });

  $('.contact-open').click(function () {
    $(this).toggleClass('open');
    $('.contact-map').slideToggle();
  });

  $('.js-hover-link').each(function (i, el) {
    const height = $(el).height();
    $(el).css('height', height);

    const name = $(el).text();
    $(el).html(`<span>${name}</span><span>${name}</span>`);
  });

  $('input').each(function (i, el) {
    $(el).blur(function () {
      $(this).val() === '+7 ' || $(this).val() === ''
        ? $(this).closest('label').removeClass('fill')
        : $(this).closest('label').addClass('fill');
    });
  });

  $('.js-team-show').click(function () {
    $(this).fadeToggle(200);
    $('.company-team__item').each((i, el) => ($(el).css('display') === 'none' ? $(el).fadeToggle(200) : ''));
  });

  $('.services-faq__item').click(function () {
    $(this).toggleClass('open');

    $(this).find('.services-faq__text').slideToggle();
    $(this).prevAll('.services-faq__item').removeClass('open').find('.services-faq__text').slideUp();
    $(this).nextAll('.services-faq__item').removeClass('open').find('.services-faq__text').slideUp();
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
    $('.services-steps__list li').removeClass('active');
    $(this).addClass('active');
    const elIndex = $(this).index();
    $('.services-steps__images img.active').removeClass('active');
    $('.services-steps__images img').eq(elIndex).addClass('active');
  }
  $('.services-steps__images img').eq(0).addClass('active');
  $('.services-steps__list li').bind('mouseenter', stepsFadeIn);

  $('.triplets').each((i, el) => {
    const price = parseInt($(el).text());
    $(el).text(triplets(price));
  });

  $('.catalog-item').each((i, el) => {
    const price = parseInt($(el).data('price'));
    $('.catalog-item__price', el).text(triplets(price));
  });

  const vacancyGrid = $('.vacancy-grid');
  if (vacancyGrid.length !== 0) {
    const num = $('.vacancy-item').length;
    if (num === 1) vacancyGrid.addClass('vacancy-grid__one');
    if (num === 2) vacancyGrid.addClass('vacancy-grid__two');
  }

  $('.table-row').each(function (i, row) {
    if (i === 0) {
      $('.table-col', row).each(function (i, col) {
        const content = $(col).html();
        const newContent = content.replace(/\|/g, '</span><span class="table-switch">');
        $(col).html(`<span>${newContent}</span>`);
      });
    }
  });

  $('.file input, .form-file input').change(function () {
    const text = $(this).parent().find('p');
    $(this).val() != '' ? text.text('Выбрано файлов: ' + $(this)[0].files.length) : text.text('Прикрепить файл');
  });

  $('.btn-up').on('click', () => {
    $('html, body').animate({ scrollTop: $('body').offset().top }, 1000);
  });

  $('.news-nav a').on('click', () => {
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - 120 }, 1000);
  });

  $('.go-vacancy').on('click', () => {
    $('html, body').animate({ scrollTop: $('.vacancy').offset().top - 125 }, 1000);
  });

  $('.go-vacancy-job').on('click', () => {
    $('html, body').animate({ scrollTop: $('.vacancy-job').offset().top - $('.header').outerHeight() + 1 }, 1000);
  });

  if (!localStorage.getItem('politic')) {
    $('.modal-politic').fadeIn(300);
    $('.modal-politic__btn').on('click', () => {
      $('.modal-politic').fadeOut(300);
      localStorage.setItem('politic', 'true');
    });
  }

  // if (!localStorage.getItem('modal')) {
  setTimeout(() => {
    $('.modal').fadeIn(300);
  }, 10000);
  $('.modal-close').on('click', () => {
    $('.modal').fadeOut(300);
    // localStorage.setItem('modal', 'true');
  });
  // }
});
