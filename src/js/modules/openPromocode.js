export default function openPromocode($) {
  $(".layout-checkout-form .layout-region-promo-code-form").hide();

  $(".open-promo-code-btn").click(function (e) {
    e.preventDefault();
    $(".layout-checkout-form .layout-region-promo-code-form").show();
  });
}
