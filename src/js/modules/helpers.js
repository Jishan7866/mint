const select = function (elem) {
  return document.querySelector(elem);
}

const selectAll = function (elem) {
  return Array.from(document.querySelectorAll(elem));
}

const toggleClass = function (target, className) {

  return function (e) {
    e.preventDefault();
    target.classList.toggle(className);
  }
}

const getTopSpace = () => {
  let space = 0
  const header = select('header')
  const toolbar = select('#toolbar-bar')
  const toolbarAdminTray = select('#toolbar-item-administration-tray.is-active')


  if (matchMedia('(min-width: 610px)').matches) {
    if (toolbar) {
      space = toolbar.getBoundingClientRect().bottom
    }
  }

  if (matchMedia('(min-width: 768px)').matches) {
    if (toolbarAdminTray) {
      space = toolbarAdminTray.getBoundingClientRect().bottom
    }
  }

  if (matchMedia('(max-width: 768px)').matches) {
    if (header) {
      space = header.getBoundingClientRect().bottom
    }
  }

  return space
}

const scroll = (top, gutter = 0) => {
  window.scrollTo({
    top: top - (30 + gutter),
    left: 0,
    behavior: 'smooth'
  })
}

export {
  select,
  selectAll,
  toggleClass,
  getTopSpace,
  scroll
};
