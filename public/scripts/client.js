/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // Test / driver code (temporary). Eventually will get this from the server.

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

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    //const container = $("");
    for (let tweet of tweets) {
      const element = createTweetElement(tweet);
      //container.append(element);
      $("#tweets-container").append(element);
      //console.log("container", container)
      console.log("element", element);
    }
  };

  renderTweets(tweetData);

  const $form = $("form");
  $form.submit(function (event) {
    event.preventDefault();
    $.ajax("/tweets", { method: "POST" }).then(function () {
      console.log($(this).serialize());
    });
  });
});

const loadTweets = function () {
  $.get("/tweets").then((data) => renderTweets(data));
};

//selectors, variables, webdevsimplified
