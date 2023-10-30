// changing URL patterns
(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.sticky = {
    attach: function (context, settings) {
      $(document).ready(function () {
        if ($('#block-mintcart').length) {
          if (!$('.cart-block--contents').length) {
            injectCartMarkups();
            setTimeout(updateStickyBanner, 500);
          }
          $(window).scroll(function () {
            scroll = $(window).scrollTop();
            if (scroll >= 120) {
              $('.cart-block--contents').addClass('sticky');
            } else {
              $('.cart-block--contents').removeClass('sticky');
            }
          });

          // navigations
          $("#step_1_nav").off('click');
          $("#step_1_nav").on('click', function () {
            $('html, body').animate({
              scrollTop: $("#step_1").offset().top - 200
            }, 2000);
          });
          $("#step_2_nav").off('click');
          $("#step_2_nav").on('click', function () {
            $('html, body').animate({
              scrollTop: $("#step_2").offset().top - 200
            }, 2000);
          });
          $("#step_3_nav").off('click');
          $("#step_3_nav").on('click', function () {
            $('html, body').animate({
              scrollTop: $("#assurance").offset().top - 10
            }, 2000);
          });
        }
        $(document).ajaxComplete(function (event, xhr, settings) {
          // do this stuffs when .cart class is available on page
          setTimeout(updateStickyBanner, 500);
        });
        $('.swiper-slide').click(function () {
          setTimeout(updateStickyBanner, 500);
        });
        setTimeout(updateStickyBanner, 500);

        // Respond to Scroll to plans selection GET param
        if (context === document) {
          var get = window.location.search.split('&');
          var i, parts;
          for (i = 0; i < get.length; i++) {
            if (get[i] === 'scroll-to-step-2') {
              $('html, body').animate({
                scrollTop: $("#step_2").offset().top - 200
              }, 2000);
            }
          }
        }
      });

      function updateStickyBanner() {
        if ($('.cart').length) {
          var plan_month_price = $('.product-plan.product-plan--bonus.checked').find('.field--name-field-base-price').text();
          // plan_month_price_clean = plan_month_price.match(/\d+/).pop();
          // var product_title =
          // $('#commerce-product-add-to-cart-form').find('.fieldset-legend').eq(0).text();
          var product_title = $('.product__options').find('.fieldset-legend').eq(0).text();
          var plan_name = $('.product-plan.product-plan--bonus.checked').find('.field--name-field-header').text();

          var plan_capacity = $('form').find('.form-radios').eq(1).find('input:checked').siblings('label').find('.field--name-name').text();

          if (plan_capacity == "") {
            plan_capacity = $('form').find('.form-radios').eq(1).find('input').siblings('label').first().find('.field--name-name').text();
          }

          var price = $('.ajax-price').text();
          // var price_clean = price.match(/\d+/).pop();
          var price_clean = price.replace('$', '');
          var total_price = parseFloat(price_clean) + parseFloat(plan_month_price);

          $('.cart').find('.views-row').eq(0).find('.views-field-title:not(.views-field-nothing-1) .field-content').text(product_title + ', ' + plan_capacity);
          $('.cart').find('.views-row').eq(0).find('.views-field-total-price__number .field-content').text(price + ' per month');
          $('.cart').find('.views-row').eq(0).find('.order-item-description').text('Total cost is $' + (price_clean * 24));

          $('.cart').find('.views-row').eq(1).find('.views-field-title .field-content').text(plan_name);
          $('.cart').find('.views-row').eq(1).find('.views-field-total-price__number .field-content').text('$' + plan_month_price + ' per month');

          // $('.cart').find('.view-footer').find('.order-total-line__total
          // .price-per-month').text('$' + total_price + ' per month' );
          $('.cart').find('.view-footer').find('.desktop.price-per-month .price-per-month').text('$' + total_price + ' per month');
          $('.cart').find('.view-footer').find('.mobile.price-per-month .total').text('$' + total_price + ' per month');
          $('.cart').find('.view-footer').find('.desktop:not(.price-per-month)').text('Min. cost is $' + (parseFloat(price_clean) * 24 + parseFloat(plan_month_price)));
          $('.cart').find('.view-footer').find('.mobile:not(.price-per-month)').text('Min. cost is $' + (parseFloat(price_clean) * 24 + parseFloat(plan_month_price)));

          var selected_plan = $('.product-plan.product-plan--bonus.checked').find('.field--widget-commerce-product-variation-attributes').attr('data-variation-id');
          var selected_phone = drupalSettings.product_variation_phone;
          var checkOutUrl = '/to-checkout/' + selected_phone + '/' + selected_plan;
          $('.mu_checkout_url').attr('href', checkOutUrl);
          $('.cart-block--contents__links a.btn').attr('href', checkOutUrl);
        }
      }

      function injectCartMarkups() {
        var selected_plan = $('.product-plan.product-plan--bonus.checked').find('.field--widget-commerce-product-variation-attributes').attr('data-variation-id');
        var selected_phone = drupalSettings.product_variation_phone;
        var checkOutUrl = '/to-checkout/' + selected_phone + '/' + selected_plan;

        $('.cart-block--contents__links .mu_checkout_url').href(checkOutUrl);
      }

      var getParams = {};
      var getParamsFromUrl = function (url) {
        var params = {};
        var parser = document.createElement('a');
        parser.href = url;
        var query = parser.search.substring(1);
        if (!query) {
          query = parser.hash.substring(parser.hash.indexOf("?") + 1);
        }
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split('=');
          params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
      };
      getParams = getParamsFromUrl(window.location.href);
      var updateURLParameter = function (url, param, paramVal) {
        var newAdditionalURL = "";
        var tempArray = url.split("?");
        var baseURL = tempArray[0];
        var additionalURL = tempArray[1];
        var temp = "";
        if (additionalURL) {
          tempArray = additionalURL.split("&");
          for (var i = 0; i < tempArray.length; i++) {
            if (tempArray[i].split('=')[0] != param) {
              newAdditionalURL += temp + tempArray[i];
              temp = "&";
            }
          }
        }
        var rows_txt = temp + "" + param + "=" + paramVal;
        return baseURL + "?" + newAdditionalURL + rows_txt;
      };

      if (getParams.plan) {
        plans = [];

        $('.product-plan.product-plan--bonus').each(function (index, value) {
          plans.push($(this).find('.field--widget-commerce-product-variation-attributes').attr('data-variation-id'));
        });

        var selected_item = plans.indexOf(getParams.plan);
        $('.product-plan--bonus').removeClass('checked');
        $('.product-plan--bonus').eq(selected_item).addClass('checked');

        if ($('.swiper-container').length) {
          $('.swiper-container')[1].swiper.slideTo(selected_item);
        }
      }

      $('.swiper-slide').click(function () {
        setTimeout(function () {
          var selected_plan = $('.product-plan.product-plan--bonus.checked').find('.field--widget-commerce-product-variation-attributes').attr('data-variation-id');
          if (selected_plan) {
            window.history.replaceState(
              '',
              '',
              updateURLParameter(
                window.location.href,
                "plan",
                selected_plan
              )
            );
          }
        }, 500);

      });

    }
  };
})(jQuery, Drupal, drupalSettings);
