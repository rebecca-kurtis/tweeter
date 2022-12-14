$(document).ready(function() {
  // --- our code goes here ---
  const $textArea = $('#tweet-text');

  const updateCount = function() {
    let maxChar = 140;
    let $charsEntered = $(this).val().length;
    $(this).next().children().last().text(maxChar - $charsEntered);

    //If the tweet character count hits negative numbers
    if ($charsEntered > maxChar) {
      $(this).next().children().last().addClass('red-text');
    } else {
      $(this).next().children().last().removeClass('red-text');
    }
  };

  $textArea.on("input", updateCount);

});



