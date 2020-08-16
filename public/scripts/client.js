/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

// const renderTweets = function(tweets) {
//   for (let tweet of tweets) {
//     let newTweet = createTweetElement(tweet)
//     $('.tweets-container').append(newTweet);
//   }
// }

// const renderTweets = function(tweets) {
//   tweets.slice().reverse().forEach(function(tweet) {
//     let newTweet = createTweetElement(tweet)
//     $('.tweets-container').append(newTweet);
//   })
// }

const renderTweets = function(tweets) {
  $('.tweets-container').empty();
  tweets.slice().reverse().forEach(function(tweet) {
    const $createdTweet = $(createTweetElement(tweet));
    $createdTweet.find('.tweet-content').text(tweet.content.text);
    $('.tweets-container').append($createdTweet);
  });
};

const createTweetElement = function(tweetObj) {
  return `
  <article class="tweetContainer">
  <header class="tweetHeader">
  <div class="tweetHeading">
    <img id="headerAvi" src=${tweetObj.user.avatars}></img>
    <h5 id='name'>${tweetObj.user.name}</h5>
    </div>
    <h6 id="handle">${tweetObj.user.handle}</h6>
    </header>
    <div>
    <p class='tweet-content'> </p>
    </div>
    <hr>
    <footer class="footing">
              <p>${tweetObj.created_at}</p>
            <div>
              <i class="fas fa-heart"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-flag"></i>
            </div>
            </article>`;
}

const loadTweets = function() {
  $.ajax('/tweets', {method: 'GET', url: '/tweets' })
  .then(function (event) {
    renderTweets(event);
  });
}

// const errorMsg = function() {

// }

//console.log($('.counter'));
const stayOnPage = function() {
  $('.new-tweet form').on('submit', (evt) => {
  //  console.log($('.counter').val());
    evt.preventDefault();
    if (Number($('.counter').val()) < 0) {
    //  console.log($('.counter'));
     // alert("Character limit is too long");
      $("#errorBox").text("Character limit is too long");
      $("#errorBox").slideDown();
      return;
    } else if (Number($('.counter').val()) === 140) {
      //alert("Nothing has been entered");
      $("#errorBox").text("Nothing has been entered");
      $("#errorBox").slideDown();
     // document.location.reload(true)
      return;
    } else {
    $.post('/tweets', $(evt.target).serialize()
    ).then(function(response) {
       // console.log(response);
       $('#tweet-text').val("");
       $('.counter').text("140");
        loadTweets();

        //document.location.reload(true)
    })}})};


$(document).ready(function() {
loadTweets();
stayOnPage();
//console.log($('.counter'));
}
)
