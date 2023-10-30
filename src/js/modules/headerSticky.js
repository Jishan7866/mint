import {
  select
} from './helpers';

export default function headerSticky() {
  const header = select('header');
  const menu = select('.region-header-middle');
  const layout = select('.layout-container');
  const toolbar = select('.toolbar-bar');
  const hamburger = select('.hamburger');
  let prevValue = 0;

  const recount = () => {
    if (matchMedia('(max-width: 959px)').matches) {
      layout.style.paddingTop = getComputedStyle(header).height;
      if (!toolbar) return;
      header.style.top = (toolbar && (toolbar.getBoundingClientRect().bottom > 0)) ?
        toolbar.getBoundingClientRect().bottom + 'px' :
        0
    } else {
      layout.style.paddingTop = '';
      header.style.top = '';
      menu.style.height = '';
    }
  }

  const toggleHeaderState = () => {
    let nextValue = window.pageYOffset;

    recount();

    if (hamburger.classList.contains('mobile-open')) return;
    if (window.pageYOffset < 80) return;

    /*
        nextValue > prevValue ? (
          header.classList.remove('showed'),
          header.classList.add('hided')
        ) : (
          header.classList.add('showed'),
          header.classList.remove('hided')
        )
    */

    prevValue = nextValue;
  }

  recount();
  window.addEventListener('resize', recount);
  window.addEventListener('mousewheel', toggleHeaderState);
  window.addEventListener('touchmove', toggleHeaderState);
}
