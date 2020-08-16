

$(document).ready(function() {
  // --- our code goes here ---
  let charRemaining = 140;
  $("#tweetButton").on('click', function() {
    console.log(this); //The this keyword is a reference to the button
  });
  $("#tweet-text").on("keyup",function() {
    const str = $("#tweet-text").val();
    const strLength = str.length;
    charRemaining = 140 - strLength;
    console.log(charRemaining);
    $(".counter").text(charRemaining)
    $("#errorBox").slideUp(); 
  })

});
