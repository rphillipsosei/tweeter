/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and prepends it to the tweets container

    for (let tweet of tweets) {
      const element = createTweetElement(tweet);
      $("#tweets-container").prepend(element);
    }
  };
  //function which takes in html template and allows unique data to be input by the user
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
  //tracks the number of characters input by the user
  $(".tweet-submit").submit(function (event) {
    event.preventDefault();
    console.log($(this).serialize());
    const tweetLength = $("#tweet-text").val().length;
    //count of how many characters of the 140 limit are remaining to be used up
    let numsLeft = 140 - tweetLength;
    //notification that appears if tweet length surpasses limit of 140
    if (numsLeft < 0) {
      $(".new-tweet p").append(
        "<strong>Error:</strong> Sorry, please enter between 1 and 140 characters."
      );
      //change of colour of the character counter if user surprasses limit of 140 characters
      $("output.counter").css("color", "red");
      //nofitication that appears if user does not tweet anything
    } else if (numsLeft === 140) {
      $(".new-tweet p").append(
        "<strong>Error:</strong> Sorry, please enter between 1 and 140 characters."
      );
    } else {
      //if there are no issues with tweet length, push input to the timeline and reset the text tweet field
      $.ajax("/tweets", { method: "POST", data: $(this).serialize() })
        .done(function () {
          $("#tweets-container").empty();
          $("#tweet-text").val("");
          loadTweets();
        })
        .fail(function (error) {
          console.log(error);
        });
    }
  });

  const loadTweets = function () {
    $.get("/tweets").then((data) => renderTweets(data));
  };

  loadTweets();
});
