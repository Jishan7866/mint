import {
  select,
  getTopSpace,
  scroll
} from './helpers'

export default function myAccountAnchors() {

  if (
    drupalSettings.mint_personal_details &&
    drupalSettings.mint_personal_details.pass_reset_user &&
    window.location.hash == ""
  ) {
    window.location.replace(window.location + '#change-password');
  }

  const {
    hash,
    origin,
    pathname
  } = window.location

  if (
    hash === '#change-password' ||
    hash === '#edit-personal-details' ||
    hash === '#billing-details' ||
    hash === '#billing-details-form' ||
    hash === '#plan-and-add-ons' ||
    hash === '#plan-addons-form-wrapper' ||
    hash === '#usage-history' ||
    hash === '#usage-history-form-wrapper'
  ) {
    const targetTitle =
      select(hash).classList.contains('accordion-title') ?
      select(hash) :
      select(hash).closest('.accordion-content').previousElementSibling
    const targetElem = select(hash)

    history.pushState ?
      history.pushState(null, '', `${origin + pathname}`) :
      window.location.href = `${origin + pathname}`

    const targetTitleTop = targetTitle.getBoundingClientRect().top + pageYOffset
    const click = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    })

    if (!targetTitle.classList.contains('opened')) {
      targetTitle.dispatchEvent(click)
      targetTitle.nextElementSibling.addEventListener('transitionend', () => {
        const targetElemTop = targetElem.getBoundingClientRect().top + pageYOffset
        scroll(targetElemTop, getTopSpace())
      }, {
        once: true
      })
    } else {
      scroll(targetTitleTop, getTopSpace())
    }
  }
}
