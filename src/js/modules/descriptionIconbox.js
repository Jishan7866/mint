/**
 * @file
 * show slider only for mobile.
 */
export default function descriptionIconbox($) {

  if (typeof $.fn.slick === "undefined") {
    return false;
  }

  $(".description-with-iconbox .iconbox-wrapper.number-of-icon-in-row-2").each(function () {
    if ($(this).find(".iconbox").length > 3) {
      $(this).slick({
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 300,
        mobileFirst: true,
        rows: 3,
        responsive: [
          {
            breakpoint: 768,
            settings: "unslick",
          },
        ],
      });
    }
  });

}
