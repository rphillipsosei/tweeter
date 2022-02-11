// $(document).ready(function () {
//   $("#tweet-text").on("keyup", function () {
//     let newTweetLength = $(this).val().length;
//     let numsLeft = 140 - newTweetLength;
//   });
// });


$(document).ready(function () {
  document.querySelector("tweet-text").addEventListener("input", function(){
  $("#tweet-text").on("keyup", function () {
    let newTweetLength = $(this).val().length;
    let counter = $(this).parent().children().find(".counter");
    let numsLeft = 140 - newTweetLength;
    let charCounter = $(this).siblings("div").find(".counter").html(numsLeft);
  
    

    if(numsLeft <= 0) {
      $(".counter").css("color", "red" )
    } else {
      $(".counter").css("color", "black" )
    }
  });
});
});