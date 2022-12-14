$(document).ready(function() {
  // --- our code goes here ---
  const $textArea = $('#tweet-text');

  const updateCount = function() {
    let maxChar = 140;
    let $charsEntered = $(this).val().length;
    let $counter = $(this).next().children().last();
    $counter.text(maxChar - $charsEntered);

    //If the tweet character count hits negative numbers
    if ($charsEntered > maxChar) {
      $counter.addClass('red-text');
    } else {
      $counter.removeClass('red-text');
    }
  };

  $textArea.on("input", updateCount);

});



