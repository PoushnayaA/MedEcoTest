import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  const navigationButton = document.querySelector('.navigation__wrapper button');
  const navigationList = document.querySelector('.navigation__list');

  navigationButton.addEventListener('click', function() {
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
});
