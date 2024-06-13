import { iosVhFix } from './utils/ios-vh-fix';
import { initModals } from './modules/modals/init-modals';
import { Form } from './modules/form-validate/form';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  var swiper = new Swiper('.swiper-container-news', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    spaceBetween: 20,
    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 0,
        allowTouchMove: false,
      },
    },
  });

  var navigation = document.querySelector('.navigation');
  var placeholder = document.querySelector('.navigation-placeholder');
  var navigationTop = navigation.getBoundingClientRect().top + window.pageYOffset;
  var initialPosition = navigation.getBoundingClientRect();

  function handleScroll() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (window.innerWidth < 768) {
      if (scrollTop >= navigationTop) {
        navigation.classList.add('fixed');
        navigation.style.width = initialPosition.width + 'px';
        navigation.style.left = initialPosition.left + 'px';
        placeholder.style.display = 'block';
        placeholder.style.height = initialPosition.height + 'px';
      } else {
        navigation.classList.remove('fixed');
        navigation.style.width = '';
        navigation.style.left = '';
        placeholder.style.display = 'none';
        placeholder.style.height = '0';
      }
    } else {
      navigation.classList.remove('fixed');
      navigation.style.width = '';
      navigation.style.left = '';
      placeholder.style.display = 'none';
      placeholder.style.height = '0';
    }
  }

  function updateInitialPosition() {
    navigationTop = navigation.getBoundingClientRect().top + window.pageYOffset;
    initialPosition = navigation.getBoundingClientRect();
  }

  function handleResize() {
    navigation.classList.remove('fixed');
    navigation.style.width = '';
    navigation.style.left = '';
    placeholder.style.display = 'none';
    placeholder.style.height = '0';

    updateInitialPosition();
    handleScroll();
  }

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);

  updateInitialPosition();

  const navigationButton = document.querySelector('.navigation__wrapper button');
  const navigationList = document.querySelector('.navigation__list');

  navigationButton.addEventListener('click', function () {
    navigationList.classList.toggle('active');
    navigationButton.classList.toggle('active');
    if (navigationList.classList.contains('active')) {
      const navListHeight = navigationList.scrollHeight;
      navigationList.style.height = `${navListHeight}px`;
    } else {
      navigationList.style.height = '0';
    }
  });

  window.addEventListener('load', () => {
    navigationList.style.height = '0';
  });

  const logo = document.querySelector('.main-header__logo img');

  logo.style.transition = 'width 1s ease';

  window.addEventListener('resize', function () {
    if (window.innerWidth <= 768) {
      logo.style.width = '48px';
    } else {
      logo.style.width = '330px';
    }
  });

  const wrapperTextElements = document.querySelectorAll('.wrapper-text-content');
  const contentContainres = document.querySelectorAll('.content-container');


  if (contentContainres.length > 1) {
    for (let i = 0; i < contentContainres.length - 1; i++) {
      contentContainres[i].classList.add('content-container-border');
    }
  } else {
    if (wrapperTextElements.length > 0) {
      for (let i = 0; i < wrapperTextElements.length - 1; i++) {
        wrapperTextElements[i].classList.add('wrapper-text-border');

      }
    }
  }




  function processRows(sw) {
    var slides = Array.from(sw.querySelectorAll('.swiper-slide'));
    var maxRows = Math.max(...slides.map(slide => slide.querySelectorAll('.row').length));
    var rowElements = [];

    var h = 0;
    sw.querySelectorAll('.row').forEach(i => i.style.height = 'auto');

    for (let i = 0; i < maxRows; i++) {
      rowElements[i] = Array.from(sw.querySelectorAll(`.swiper-slide .row:nth-child(${i + 1})`));
    }

    for (let j = 0; j < rowElements.length; j++) {
      h = 0;
      for (let i = 0; i < rowElements[j].length; i++) {
        if (rowElements[j][i].offsetHeight > h) {
          h = rowElements[j][i].offsetHeight;
        }
      }
      for (let i = 0; i < slides.length; i++) {
        rowElements[j][i].style.height = `${h}px`;
      }
    }
  }

  function assignUniqueClassToChildren() {
    const tableSwipers = document.querySelectorAll('.table-swiper');
    let uniqueClassIndex = 0;

    console.log(1);

    tableSwipers.forEach(tableSwiper => {
      const child = tableSwiper.children[0];
      const uniqueClass = `table-swiper-${uniqueClassIndex}`;
      child.classList.add(uniqueClass);
      const slides = document.querySelector(`.${uniqueClass}`).querySelectorAll('.swiper-slide');
      const slidesCount = slides.length;

      if (slidesCount <= 4 && window.innerWidth >= 768) {
        const slideWidth = (100 / slidesCount).toFixed(2) + '%';
        slides.forEach(slide => {
          slide.style.maxWidth = slideWidth;
        });
        document.querySelector(`.${uniqueClass}`).style.paddingBottom = '0px';
      }

      if (window.innerWidth < 768) {
        slides.forEach(slide => {
          slide.style.maxWidth = 'unset';
        });
        document.querySelector(`.${uniqueClass}`).style.paddingBottom = '0px';
      }

      if (slidesCount > 4 && window.innerWidth >= 768) {
        slides.forEach(slide => {
          slide.style.maxWidth = '25%';
        });
        document.querySelector(`.${uniqueClass}`).style.paddingBottom = '40px';
        document.querySelector(`.${uniqueClass}`).querySelector('.swiper-pagination').style.setProperty('bottom', '0', 'important');
      }

      const swiper = new Swiper(`.${uniqueClass}`, {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },

        breakpoints: {

          768: {
            slidesPerView: 'auto',
            spaceBetween: 0,
            allowTouchMove: true,
          },

          320: {
            slidesPerView: 2,
            spaceBetween: 0,
            allowTouchMove: true,
          },
        },
      });
      window.addEventListener('scroll', function () {
        processRows(this.document.querySelector(`.${uniqueClass}`))
      });
      window.addEventListener('resize', function () {
        processRows(this.document.querySelector(`.${uniqueClass}`))
      });
      uniqueClassIndex++;
    });
  }


  // assignUniqueClassToChildren();

  function adjustH3Heights() {
    const wrapperProducts = document.querySelector('.wrapper-products');
    if (!wrapperProducts) return;

    const h3Elements = wrapperProducts.querySelectorAll('h3');
    let maxHeight = 0;

    h3Elements.forEach(h3 => {
      h3.style.height = 'auto';
      const height = h3.offsetHeight;
      maxHeight = Math.max(maxHeight, height);
    });

    h3Elements.forEach(h3 => {
      h3.style.height = `${maxHeight}px`;
      h3.parentElement.style.display = 'flex';
      h3.parentElement.style.alignItems = 'center';
    });
  }

  window.addEventListener('load', adjustH3Heights);
  window.addEventListener('resize', adjustH3Heights);
  window.addEventListener('load', assignUniqueClassToChildren);
  window.addEventListener('resize', assignUniqueClassToChildren);

});
