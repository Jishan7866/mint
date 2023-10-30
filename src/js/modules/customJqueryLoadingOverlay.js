export default function customJqueryLoadingOverlay($) {
  $(".nuShowOverlay").on("click", function () {
    $(document).ajaxStart(function () {
      $.LoadingOverlay("show");
    });
    $(document).ajaxStop(function () {
      $.LoadingOverlay("hide");
    });
  });
}
