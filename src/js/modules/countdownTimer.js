export default function countdownTimer($) {

  $(".countdown-timer").each(function (index) {
    var $el = $(this),
      $date = $el.attr('date'),
      $month = $el.attr('month'),
      $year = $el.attr('year'),
      $hour = $el.attr('hour'),
      $minute = $el.attr('minute'),
      $second = $el.attr('second'),
      $date = new Date($year, $month-1, $date, $hour, $minute, $second),
      days = 'null',
      hours = 'null',
      minutes = 'null',
      seconds = 'null',
      daycopy = 'null',
      hourscopy = 'null',
      minutescopy = 'null',
      secondscopy = 'null';

    $el.text('').append(
      '<div class="counter-item"><span class="box"><span class="days"></span></span><label>Days</label></div>' +
      '<div class="counter-item"><span class="box"><span class="hours"></span></span><label>Hours</label></div>' +
      '<div class="counter-item"><span class="box"><span class="minutes"></span></span><label>Minutes</label></div>' +
      '<div class="counter-item"><span class="box"><span class="seconds"></span></span><label>Seconds</label></div>'
    );

    // Set the date we're counting down to
    var countDownDate = new Date($date).getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      days = Math.floor(distance / (1000 * 60 * 60 * 24));
      hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with class="countdown-timer"
      if (days != daycopy) {
        $el.find('.days').text(days);
      }
      if (hours != hourscopy) {
        $el.find('.hours').text(hours);
      }
      if (minutes != minutescopy) {
        $el.find('.minutes').text(minutes);
      }
      if (seconds != secondscopy) {
        $el.find('.seconds').text(seconds);
      }

      daycopy = days;
      hourscopy = hours;
      minutescopy = minutes;
      secondscopy = seconds;

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        $el.text("EXPIRED");
      }
    }, 1000);

  });
}
