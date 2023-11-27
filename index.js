import { tweetsData } from "./data.js";
import {
  handleLikeClick,
  handleRetweetClick,
  handleTweetBtnClick,
  handleReplyClick,
  handleReplytoTweet,
  saveToLocalStorage,
  clearLocalStrorage,
} from "./utils.js";

document.addEventListener("DOMContentLoaded", function () {
  const storedData = JSON.parse(localStorage.getItem("tweetsData"));
  if (storedData) {
    tweetsData.length = 0;
    tweetsData.push(...storedData);
  }
  render();
});

document.addEventListener("click", function (e) {
  if (e.target.dataset.like) {
    handleLikeClick(
      e.target.dataset.like,
      tweetsData,
      render,
      saveToLocalStorage
    );
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(
      e.target.dataset.retweet,
      tweetsData,
      render,
      saveToLocalStorage
    );
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
  } else if (e.target.id === "tweet-btn") {
    handleTweetBtnClick(
      document.getElementById("tweet-input"),
      tweetsData,
      render,
      saveToLocalStorage
    );
  } else if (e.target.dataset.response) {
    handleReplytoTweet(
      e.target.dataset.response,
      document.getElementById(`tweet-reply-input-${e.target.dataset.response}`)
        .value,
      tweetsData,
      render,
      saveToLocalStorage
    );
  } else if (e.target === document.getElementById("reset")) {
    clearLocalStrorage();
  }
});

function getFeedHtml() {
  let feedHtml = ``;

  tweetsData.forEach(function (tweet) {
    let likeIconClass = "";

    if (tweet.isLiked) {
      likeIconClass = "liked";
    }

    let retweetIconClass = "";

    if (tweet.isRetweeted) {
      retweetIconClass = "retweeted";
    }

    let repliesHtml = "";
    if (tweet.replies.length > 0) {
      tweet.replies.forEach(function (reply) {
        repliesHtml += `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                </div>
                `;
      });
    }

    feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots"
                            data-reply="${tweet.uuid}"
                            ></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${likeIconClass}"
                            data-like="${tweet.uuid}"
                            ></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${retweetIconClass}"
                            data-retweet="${tweet.uuid}"
                            ></i>
                            ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
            <div class="hidden" id="replies-${tweet.uuid}">
                <div>
                    <div class="tweet-input-area">
                        <img src="images/scrimbalogo.png" class="profile-pic">
                        <textarea placeholder="Do you want to reply ?" id="tweet-reply-input-${tweet.uuid}"></textarea>
                    </div>
                    <button id="tweet-reply-btn" data-response="${tweet.uuid}">Reply to Tweet</button>
                </div>
                ${repliesHtml}
            </div>   
        </div>
        `;
  });
  return feedHtml;
}

function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}
