export default function accordion() {

  const handler = e => {
    const btn = e.target.closest('.js-btn-toggle');
    if (!btn) return;

    const wrap = btn.nextElementSibling;
    const wrapHeight = wrap.getBoundingClientRect().height;
    const content = wrap.firstElementChild;
    const config = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    };
    let contentHeight = content.getBoundingClientRect().height;

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          contentHeight = content.getBoundingClientRect().height;
          wrap.style.height = contentHeight + 'px';
        }
      });
    });

    if (wrapHeight === (btn.classList.contains('container-item-title') ? 3 : 0)) {
      wrap.style.height = contentHeight + 'px';
      btn.classList.add('opened');
      if (
        btn.matches('#personal-details') ||
        btn.matches('#billing-details')
      ) observer.observe(wrap, config);
    } else {
      wrap.style.height = '';
      btn.classList.remove('opened');
    }
  }

  document.addEventListener('click', handler);
}
