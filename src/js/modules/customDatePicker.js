export default ($) => {
  Drupal.behaviors.datepicker = {
    attach: function (context) {
      $('.form-item-mint-commerce-identification-checkout-pane-id-check-medicare-card-y-medicare-expiration input[type="text"], .form-item-mint-commerce-identification-checkout-pane-id-check-medicare-card-b-medicare-expiration input[type="text"]').datepicker({
        format: 'dd/mm/yyyy'
      });
      $('.form-item-mint-commerce-identification-checkout-pane-id-check-medicare-card-g-medicare-expiration input[type="text"]').datepicker({
        format: 'mm/yyyy'
      });
    }
  }
}
