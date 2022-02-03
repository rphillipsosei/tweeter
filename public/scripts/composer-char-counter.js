$(document).ready(function() {
    $('#tweet-text').on('keyup', function() {
   let newTweetLength = $(this).val().length;
   let numsLeft = 140 - newTweetLength 
  //  console.log("numsLeft", numsLeft)
  //  console.log("newTweetLength", newTweetLength)
   let charCounter = $(this).siblings('div').find('.counter').html(numsLeft);
 
  
   if (numsLeft < 0) {
     charCounter.addClass('tweetTooLong') 
   } else if (numsLeft >= 0) {
     charCounter.removeClass('tweetTooLong');
    }

  

 });
 });

 