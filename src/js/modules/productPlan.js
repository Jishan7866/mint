import {
    select,
    selectAll
} from './helpers';

export default function productPlan($) {

    const click = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
    })

    const checkProduct = () => {
        const product = select('.product__options')
        if (!product) return
            // product.querySelector('.js-form-submit').dispatchEvent(click)
    }

    const checkPopularPlan = () => {
        const plan = select('.product-plan')
        if (!plan) return

        const params = {}

        let query = location.search
        if (query) {
            query = query.slice(1).split('&')
            query.forEach(param => {
                params[param.split('=')[0]] = param.split('=')[1]
            })
        }

        const variation = select(`[data-variation-id="${params.plan}"]`)

        if (!query || !variation) {
            const popularPlan = select('.product-plan--popular')
            if (!popularPlan) return

            popularPlan.classList.add('checked')

            if (false && popularPlan.querySelector('.js-form-submit'))
                popularPlan.querySelector('.js-form-submit').dispatchEvent(click)
        } else {
            const plan = variation.closest('.product-plan')

            plan.classList.add('checked')

            // if (plan.querySelector('.js-form-submit'))
            //   plan.querySelector('.js-form-submit').dispatchEvent(click)
        }
    }

    let href

    let customerId, lineSeqNo
    const handler = e => {
        // const productTitle = e.target.closest('.product-plan__title')
        // if (!productTitle) return
        const plan = e.target.closest('div div')
        const dialog = plan.closest('.ui-dialog')
        selectAll('.product-plan').forEach(plan => plan.classList.remove('checked'))
        plan.classList.add('checked')
            // if (plan.querySelector('.js-form-submit'))
            //   plan.querySelector('.js-form-submit').dispatchEvent(click)

        if (dialog) {
            const price = plan
                .querySelector('.product-price-formatted .price .value')
                .textContent
            const planID = plan.getAttribute('data-product-id')
            const total = dialog.querySelector('.view-footer .selected-variation-price')
            const selectPlanButton = dialog.querySelector('.view-footer .btn')

            let arr = selectPlanButton.getAttribute('href').split('/')
            if (arr[arr.length - 1] === 'null') {
                arr[arr.length - 1] = `${customerId} / ${lineSeqNo} / ${planID}`
            } else {
                arr = arr.slice(0, -2)
                arr[arr.length - 1] = `${customerId} / ${lineSeqNo} / ${planID}`
            }
            href = arr.join('/')

            Drupal.ajax.instances.map(instance => {
                if (instance === null) return
                if (instance.selector === null) return
                if (instance.selector === '#select-plan-button') {
                    instance.options.url = href + "?_wrapper_format=drupal_modal"
                    instance.url = href
                }
            })
            selectPlanButton.setAttribute('href', href)
            selectPlanButton.classList.remove('is-disabled')

            total.innerHTML = price
        }
    }
    $(document).on("click", ".slick--view--my-account-change-plan--page-1 .slick-prev.slick-arrow", function() {
        setTimeout(function() {
            $('.slick-slide.slick-active:eq(0)').children().addClass('checked').click();
        }, 200);
    });
    $(document).on("click", ".slick--view--my-account-change-plan--page-1 .slick-next.slick-arrow", function() {
        setTimeout(function() {
            $('.slick-slide.slick-active:eq(0)').children().addClass('checked').click();
        }, 200);
    });
    $(document).on("click", "ul.slick-dots li.slick-active", function() {
        setTimeout(function() {
            $('.slick-slide.slick-active:eq(0)').children().addClass('checked').click();
        }, 200);
    });

    $(document).ready(() => checkProduct())
    $(document).one('ajaxStop', () => {
        checkPopularPlan()
    })
    $(document).ajaxStop(() => {
        (($, Drupal, drupalSettings) => {
            customerId = drupalSettings.customer_id
            lineSeqNo = drupalSettings.line_seq_no
        })($, Drupal, drupalSettings)
    })
    document.addEventListener('click', handler)
}