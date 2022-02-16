$(document).ready(function () {
  //listens for every instance that keys are entered
  document.querySelector("#tweet-text").addEventListener("input", function () {
    $("#tweet-text").on("keyup", function () {
      //number of characters that have been typed by user
      let newTweetLength = $(this).val().length;
      //counts how many characters have been used up of 140 characterlimit
      let numsLeft = 140 - newTweetLength;
      //connects .counter in html with numsLeft calculation
      $(this).siblings("div").find(".counter").html(numsLeft);

      //if character limit has been reached, the character counter in the front end will turn red
      if (numsLeft <= 0) {
        $(".counter").css("color", "red");
        //otherwise, it should remain black
      } else {
        $(".counter").css("color", "black");
      }
    });
  });
});
