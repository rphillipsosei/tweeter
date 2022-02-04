$(document).ready(function() {
    $('#tweet-text').on('keyup', function() {
   let newTweetLength = $(this).val().length;
   let numsLeft = 140 - newTweetLength 
   let charCounter = $(this).siblings('div').find('.counter').html(numsLeft);
 
  
 

  

 });
 });

 