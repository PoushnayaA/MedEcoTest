import { iosVhFix } from './utils/ios-vh-fix';
import { initModals } from './modules/modals/init-modals';
import { Form } from './modules/form-validate/form';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

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


//   function processRows() {
//     var slides = Array.from(document.querySelectorAll('.swiper-slide'));
//     var maxRows = Math.max(...slides.map(slide => slide.querySelectorAll('.row').length));
//     var rowElements = [];

//     var h = 0;
//     document.querySelectorAll('.row').forEach(i => i.style.height = 'auto');

//     for (let i = 0; i < maxRows; i++) {
//       rowElements[i] = Array.from(document.querySelectorAll(`.swiper-slide .row:nth-child(${i + 1})`));
//     }

//     for (let j = 0; j < rowElements.length; j++) {
//       h = 0;
//       for (let i = 0; i < rowElements[j].length; i++) {
//         if (rowElements[j][i].offsetHeight > h) {
//           h = rowElements[j][i].offsetHeight;
//         }
//       }
//       for (let i = 0; i < 4; i++) {
//         rowElements[j][i].style.height = `${h}px`;
//       }
//     }
//   }

// window.addEventListener('scroll', processRows);
// window.addEventListener('resize', processRows);
});
