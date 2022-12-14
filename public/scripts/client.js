/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //create a tweet box with contents from inputed data
  const createTweetElement = function(tweets) {
    const format = window.timeago.format;
    let createdAtStamp = format(tweets.created_at);
    const $newTweet = $(`
      <article class="tweet">
        <header>
          <div class="header-left">
            <img src="${tweets.user.avatars}"/>
            <p> ${tweets.user.name}</p>
          </div>
          <div class="header-right">
            <p>${tweets.user.handle}</p>
          </div>
        </header>
            <p>${tweets.content.text} </p>
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
    for (const tweet of tweets) {
      //create tweet
      const $newTweet = createTweetElement(tweet);
      //add tweet to container
      $tweetContainer.prepend($newTweet);
    }
  };

  // renderTweets(data);

  const loadTweets = function() {
    $.get('/tweets', (tweets) => {
      renderTweets(tweets);
    });
  };
  loadTweets();

  //AJAX POST Request
  const $form = $('.new-tweet form');
  $form.on('submit', (event) => {
    event.preventDefault();

    //Validation checks
    let maxChar = 140;
    let $charsEntered = $('#tweet-text').val().length;

    if ($charsEntered > maxChar) {
      window.alert('Your tweet is too long!');
      return;
    }
    if ($charsEntered === 0) {
      window.alert('Your tweet is empty!');
      return;
    }

    const data = $form.serialize();
    console.log(data);
    
    //clear the text portion
    $("#tweet-text").val('');

    $.post('/tweets', data, (response) => {
      console.log('post response', response);
    });
  });
});