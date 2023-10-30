import Swiper from 'swiper'

import {
  selectAll,
  select
} from './helpers'

export default function carousel($) {

  if (!select('.product-plan')) return

  let swiper, slides, highestSlide, indexOfPopularPlan = 0

  if (select('.swiper-container')) {
    swiper = new Swiper('.swipe-container-type .swiper-container', {
      slidesPerView: 4,
      slidesPerGroup: 1,
      watchSlidesVisibility: true,
      slideToClickedSlide: true,
      centeredSlides: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        920: {
          slidesPerView: 3
        },
        768: {
          slidesPerView: 2
        },
        515: {
          slidesPerView: 1
        }
      }
    })
  }

  const getHeight = elem =>
    parseFloat(getComputedStyle(elem).height)

  const getOptions = elem =>
    elem.querySelector('.product-plan .attribute-widgets, .product-plan__variations')

  const appendEmptyOption = options => {
    const emptyOption = document.createElement('div')
    emptyOption.classList.add('empty-option')
    options.appendChild(emptyOption)
  }

  // Display default / popular plan
  slides = selectAll('.ui-dialog .product-plan, .swiper .product-plan')
  indexOfPopularPlan = slides.findIndex(slide => {
    return slide.matches('.product-plan.product-plan--popular')
  })
  if (typeof swiper !== 'undefined') {
    swiper.slideTo(indexOfPopularPlan)
    $('.product-plan--bonus').eq(indexOfPopularPlan).addClass('checked')
  }

  $(document).ajaxStop(() => {
    slides = selectAll('.ui-dialog .product-plan, .swiper .product-plan')

    slides.reduce((prevHeight, slide) =>
      highestSlide = getHeight(getOptions(slide)) > prevHeight ?
      getHeight(getOptions(slide)) :
      prevHeight, 0)

    setTimeout(() =>
      slides.forEach(slide => {
        while (getHeight(getOptions(slide)) < highestSlide) {
          appendEmptyOption(getOptions(slide))
        }
      }), 0)

    indexOfPopularPlan = slides.findIndex(slide => {
      const popularPlan = slide.matches('.product-plan.checked')
      if (popularPlan) return true
    })

    if (
      indexOfPopularPlan !== 0 &&
      typeof swiper !== 'undefined'
    ) swiper.slideTo(indexOfPopularPlan)
  })
}
