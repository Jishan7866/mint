import {
  select,
  selectAll,
  getTopSpace
} from './helpers'

export default function stickyBanner() {
  const stickyWrap = select('.block-mint-commerce-cart')
  if (!stickyWrap) return
  const stickyContent = stickyWrap.querySelector('.cart-block--contents')
  const stickyHeight = stickyContent.matches('.sticky') ?
    stickyContent.getBoundingClientRect().bottom + 31 :
    getTopSpace() + stickyContent.getBoundingClientRect().height + 31

  const highlighting = () => {
    selectAll('.block-mint-commerce-cart .views-row, .block-mint-commerce-cart .view-footer')
      .forEach(item => {
        item.classList.remove('is-active')
        const target = item.querySelector('[href^="#"]').getAttribute('href')
        if (!select(target)) return
        const targetCoords = select(target).getBoundingClientRect()
        if (targetCoords.top < stickyHeight) {
          item.classList.add('is-active')
        }
      })
  }

  const recount = () => {
    const stickyWrapCoords = stickyWrap.getBoundingClientRect()
    const stickyContentCoords = stickyContent.getBoundingClientRect()

    stickyWrap.style.height = stickyContentCoords.height + 'px'
    if (stickyWrapCoords.top < getTopSpace()) {
      stickyContent.classList.add('sticky')
      stickyContent.style.transform = `
                translateY(${getTopSpace()}px)
            `
    } else {
      stickyContent.classList.remove('sticky')
      stickyContent.style.transform = ''
    }

    highlighting()
  }

  recount()
  window.addEventListener('resize', recount, {
    passive: true
  })
  window.addEventListener('scroll', recount, {
    passive: true
  })
  window.addEventListener('orientationChange', recount, {
    passive: true
  })
}
