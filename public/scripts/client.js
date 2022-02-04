/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    
    for (let tweet of tweets) {
      const element = createTweetElement(tweet);
      $("#tweets-container").prepend(element);
    }
  };

  const createTweetElement = function (tweetData) {
    const $toDynamic = `<article class="tweet">
<header class="tweet-header">
  <div class="user-image">    
  <img src="${tweetData.user.avatars}"></img>
  <h3>${tweetData.user.name}</h3>
  </div>
  <p>${tweetData.user.handle}</p>
</header>


<p>${tweetData.content.text} </p>
<footer class="footer">
    <p>${timeago.format(tweetData.created_at)}</p>
    <div class="social-icons">
      <i class="fa-solid fa-flag flag"></i>
      <i class="fa-solid fa-retweet retweet"></i>
      <i class="fa-solid fa-heart heart"></i>
    </div>
</footer>
</article> `;
    return $toDynamic;
  };


  $(".tweet-submit").submit(function (event) {
    event.preventDefault();
    console.log($(this).serialize());
    const tweetLength = $("#tweet-text").val().length;
    let numsLeft = 140 - tweetLength;
    if (numsLeft < 0) {
      $('.new-tweet p').append("<strong>Error:</strong> We know you have a lot to say, but your tweet is too long. Please limit it to 140 characters.");
      $("output.counter").css("color", "red")
    } else if (numsLeft === 140) {
      alert("Tweet too short");
    } else {
      $.ajax("/tweets", { method: "POST", data: $(this).serialize() })
      .done(function () {
        $("#tweets-container").empty();
        loadTweets();
      })
      .fail(function (error){
      console.log(error)
      })
    }
  });



  const loadTweets = function () {
    $.get("/tweets").then((data) => renderTweets(data));
  };

  loadTweets();
});
