export default function checkoutSpinner($) {

  $("form.commerce-checkout-flow.checkout-step-login").submit(function () {
    $(".commerce-checkout-flow.checkout-step-login .form-actions .form-submit").after('<span class="spinner"></span>');
  });

  $("form.commerce-checkout-flow.checkout-step-order-information").submit(function () {
    $(".commerce-checkout-flow.checkout-step-order-information .form-actions .form-submit").after('<span class="spinner order-info"></span>');
  });

  $(".commerce-checkout-flow.checkout-step-order-information .form-actions .btn-back").click(function () {
    $(this).after('<span class="spinner back"></span>');
  });

  $("form.commerce-checkout-flow.checkout-step-payment").submit(function () {
    $(".commerce-checkout-flow.checkout-step-payment .form-actions .form-submit").after('<span class="spinner payment"></span>');
  });

}
