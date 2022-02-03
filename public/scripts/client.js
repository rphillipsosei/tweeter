/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
 $(".tweet-submit").submit(function (event) {
    
    event.preventDefault();
    const tweetLength = $("#tweet-text").val().length;
console.log("tweetLength", tweetLength)
    let numsLeft = 140 - tweetLength;
    console.log("numsLeft", numsLeft)
    if (numsLeft < 0) {
      
      //charCounter.addClass("tweetTooLong") 
       alert("Tweet too long");
    } else if (numsLeft === 140) {
      alert("Tweet too short")
      //charCounter.removeClass("tweetTooLong");
    } else {
    $.ajax("/tweets", { method: "POST" }).then(function () {
      console.log($(this).serialize());

    });
  };
});

loadTweets()
})
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
    }
  };

  //renderTweets(tweetData);

  
  

const loadTweets = function () {
  $.get("/tweets").then((data) => renderTweets(data));
}

