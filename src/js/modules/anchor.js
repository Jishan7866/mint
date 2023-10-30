import {
  select,
  getTopSpace,
  scroll
} from './helpers'

export default function anchor() {

  const handler = e => {
    const anchor = e.target.closest('[href^="#"]')
    if (!anchor) return
    e.preventDefault()
    const target = select(anchor.getAttribute('href'))
    const stickyContent = select('.cart-block--contents')
    const header = select('header')
    const toolbar = select('#toolbar-bar')
    let gutter = 0
    if (!target) return
    const targetTop = target.getBoundingClientRect().top + pageYOffset

    if (stickyContent) {
      gutter += stickyContent.matches('.sticky') ?
        stickyContent.getBoundingClientRect().bottom :
        getTopSpace() + stickyContent.getBoundingClientRect().height
    }

    if (matchMedia('(max-width: 610px)').matches) {
      if (header && toolbar && toolbar.getBoundingClientRect().bottom > 0) {
        header.style.top = '0'
      }
    }

    const event = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    })

    if (target.matches('.js-btn-toggle') && !target.classList.contains('opened')) {
      target.dispatchEvent(event)
      target.nextElementSibling.addEventListener('transitionend', () => scroll(targetTop, gutter), {
        once: true
      })
    } else {
      scroll(targetTop, gutter)
    }
  }

  document.addEventListener('click', handler)
}
