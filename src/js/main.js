import smoothscroll from "smoothscroll-polyfill";
import polyfills from "./modules/polyfills";

//import hamburger from './modules/hamburger'
import headerSticky from "./modules/headerSticky";
import stickyBanner from "./modules/stickyBanner";
import accordion from "./modules/accordion";
import anchor from "./modules/anchor";
import carousel from "./modules/carousel";
import tooltip from "./modules/tooltip";
import productPlan from "./modules/productPlan";
import myAccountAnchors from "./modules/myAccountAnchors";
import closeMyAccountPopup from "./modules/closeMyAccountPopup";
import disablePopupButtons from "./modules/disablePopupButtons";
import datepicker from "./modules/customDatePicker";
import smartPunctuation from "./modules/smartPunctuation";
import openChat from "./modules/openChat";
import openPromocode from "./modules/openPromocode";
import countdownTimer from "./modules/countdownTimer";
import checkout from "./modules/checkout";
import checkoutSpinner from "./modules/checkoutSpinner";
import customJqueryLoadingOverlay from "./modules/customJqueryLoadingOverlay";
import descriptionIconbox from "./modules/descriptionIconbox";
import faqAccordion from "./modules/faqAccordion";

(($) => {
  smoothscroll.polyfill();
  polyfills();
  smartPunctuation();

  //hamburger()
  headerSticky();
  accordion();
  anchor();
  tooltip();
  productPlan($);
  carousel($);
  myAccountAnchors();
  closeMyAccountPopup();
  disablePopupButtons($);
  datepicker($);
  openChat($);
  openPromocode($);
  countdownTimer($);
  checkout($);
  checkoutSpinner($);
  customJqueryLoadingOverlay($);
  descriptionIconbox($);
  faqAccordion($);

  $(document).ajaxStop(() => {
    myAccountAnchors();
    stickyBanner();
  });

  // get ajax price
  $(document).ajaxComplete(() => {
    $(".product-price .ajax-price").text(
      `$${$(".product-price .field--name-price").text()}`
    );
    var full_price = parseFloat($(".product-price .field--name-price").text());
    full_price = full_price * 24;

    $(".product-price .ajax-full-price").text(`$${full_price}`);
  });

  // select style
  Drupal.behaviors.selectStyle = {
    attach: function (context) {
      $("select:not(.no-selectize)").selectize({
        onInitialize: function () {
          this.$control_input.attr("readonly", true);
        },
      });
    },
  };
})(jQuery);
