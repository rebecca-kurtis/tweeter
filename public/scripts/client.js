/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  //create a tweet box with contents from inputed data
  const createTweetElement = function(tweets) {
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
            <p> ${tweets.created_at}</p>
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

  renderTweets(data);
  
});