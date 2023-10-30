export default function faqAccordion($) {

  $(".faq-accordion").on("click", ".question .question-title", function () {
    let question = $(this).parent();
    let questionBody = question.find(".question-body");
    if (question.hasClass("open")) {
      questionBody.slideUp("fast", function () {
        question.removeClass("open");
      });
    } else {
      questionBody.slideDown("fast", function () {
        question.addClass("open");
      });
    }
  });
}
