/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//import moment from 'moment';

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
              <p>${moment(tweetObj.created_at).format("MM-DD-YYYY")}</p>
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



const stayOnPage = function() {
  $('.new-tweet form').on('submit', (evt) => {
    evt.preventDefault();
    if (Number($('.counter').val()) < 0) {
      $("#errorBox").text("Character limit is too long");
      $("#errorBox").slideDown();
      return;
    } else if (Number($('.counter').val()) === 140) {
      $("#errorBox").text("Nothing has been entered");
      $("#errorBox").slideDown();
      return;
    } else {
    $.post('/tweets', $(evt.target).serialize()
    ).then(function(response) {
       $('#tweet-text').val("");
       $('.counter').text("140");
        loadTweets();
    })}})};


$(document).ready(function() {
loadTweets();
stayOnPage();
}
)
