import {
  select,
  selectAll
} from './helpers';

export default function hamburger() {
  const html = document.documentElement;
  const header = select('header');
  const hamburger = select('.hamburger');
  const menu = select('.region-header-middle');
  const menuLinks = selectAll('.region-header-middle li a');
  const search = select('.header-search');
  const toolbar = select('.toolbar-bar');
  let transitionDelay = 50,
    increment = 50;

  menu.classList.add('mobile-close');
  search && search.classList.add('mobile-close');

  const toggleMenu = () => {
    html.classList.toggle('mobile-open');
    hamburger.classList.toggle('mobile-open');
    menu.classList.toggle('mobile-open');
    search && search.classList.toggle('mobile-open');
    menu.classList.toggle('mobile-close');
    search && search.classList.toggle('mobile-close');
    menu.style.top = `
      ${(search ? search.getBoundingClientRect().height : 0)
        + header.getBoundingClientRect().height}px
    `;
    menu.style.height = `
      calc(100vh - ${(search ? search.getBoundingClientRect().height : 0)
      + header.getBoundingClientRect().height + ((toolbar && (toolbar.getBoundingClientRect().bottom > 0)) ? toolbar.getBoundingClientRect().bottom : 0)}px)
    `;

    for (let i = 0; i < menuLinks.length; ++i) {
      menuLinks[i].style.transitionDelay = `${transitionDelay}ms`;
      transitionDelay += increment;
    }

    transitionDelay = 0.1;
  }

  hamburger.addEventListener('click', toggleMenu);
}
