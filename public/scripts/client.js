/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //escape an xss attack function
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //create a tweet box with contents from inputed data
  const createTweetElement = function(tweets) {
    const format = window.timeago.format;
    let createdAtStamp = format(escape(tweets.created_at));
    const $newTweet = $(`
      <article class="tweet">
        <header>
          <div class="header-left">
            <img src="${escape(tweets.user.avatars)}"/>
            <p> ${escape(tweets.user.name)}</p>
          </div>
          <div class="header-right">
            <p>${escape(tweets.user.handle)}</p>
          </div>
        </header>
            <p>${escape(tweets.content.text)} </p>
          <hr/>
        <footer>
          <div class="date">
            <p> ${createdAtStamp}</p>
          </div>
          <div class="emojis">
            <p>
              <i class="fa-solid fa-flag"></i>
              <i class="fa-sharp fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </p>
          </div>
        </footer>
      </article> 
  `);
    return $newTweet;
  };


  //loop through tweets and calls the above function and appends to tweets container
  const $tweetContainer = $('#tweets-container');
  const renderTweets = function(tweets) {
    $tweetContainer.empty();
    for (const tweet of tweets) {
      //create tweet
      const $newTweet = createTweetElement(tweet);
      //add tweet to container
      $tweetContainer.prepend($newTweet);
    }
  };



  //AJAX POST Request
  const $form = $('.new-tweet form');
  $form.on('submit', (event) => {
    event.preventDefault();

    //Validation checks
    let maxChar = 140;
    let $charsEntered = $('#tweet-text').val().length;
    let $errMsg = $('#ErrMsg');

    if ($charsEntered > maxChar) {

      $("#ErrMsg span").text("Your tweet is too long! You can only have a max of 140 characters.");
      $errMsg.addClass('error-message');
      $('.error-message').show();

      setTimeout(() => {
        $errMsg.removeClass('error-message');
        $("#ErrMsg span").text('');
      }, 5000);
      return;
    }

    if ($charsEntered === 0) {

      $("#ErrMsg span").text("Your tweet is empty!");
      $errMsg.addClass('error-message');
      $('.error-message').show();

      setTimeout(() => {
        $errMsg.removeClass('error-message');
        $("#ErrMsg span").text('');
      }, 5000);
      return;
    }

    const data = $form.serialize();

    $.post('/tweets', data)
      .then(loadTweets);

    //clear the text and counter portion
    $("#tweet-text").val('');
    $(".counter").text(140);

  });

  //function to load the tweets on the page
  const loadTweets = function() {
    $.get('/tweets', (tweets) => {
      renderTweets(tweets);
    });
  };
  loadTweets();

});