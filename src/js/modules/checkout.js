export default function checkout($) {

  $.fn.moveErrorAfterSelectize = function () {
    $(".form-select.selectized, .form-checkbox").each(function () {
      $(this).parent().find('.form-item--error-message').appendTo($(this).parent());
    });
  };

  $(document).on('click', '#details-correct-wrapper .details-correct-close-link', function (e) {
    e.preventDefault();
    $('#details-correct-wrapper').fadeOut();
    $('body').removeClass('details-correct-wrapper-open');
  });

  /*
    $(document).on('click', '#details-correct-wrapper', function (e) {
      var container = $(".details-correct-inner");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('#details-correct-wrapper').fadeOut();
      }
    });
  */

  /*-- faq --*/
  $(".idcredit-check-markup-wrapper .questions-and-answers-wrapper .question-title").click(function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $(this).parent('.question').find(".question-body").slideToggle();
  });

  /* -- custom fixes for tooltips for checkout pages only  --*/
  $(".cart-payment-summary.tooltip-text .tooltip-icon").click(function() { return false; });
  $(".cart-payment-summary.tooltip-text .tooltip-icon").click(function () {
    $(".cart-payment-summary.tooltip-text").addClass("showed");
    $(".cart-payment-summary.tooltip-text .tooltip-text").addClass("showed");
    $(".cart-payment-summary.tooltip-text .tooltip-text").css("bottom", '80%');
  });

}
