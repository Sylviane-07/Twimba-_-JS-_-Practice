import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export function handleLikeClick(tweetId, data, render, saveToLocalStorage) {
  const targetTweetObj = data.find((tweet) => tweet.uuid === tweetId);

  if (targetTweetObj.isLiked) {
    targetTweetObj.likes--;
  } else {
    targetTweetObj.likes++;
  }
  targetTweetObj.isLiked = !targetTweetObj.isLiked;
  render();
  saveToLocalStorage(data);
}

export function handleRetweetClick(tweetId, data, render, saveToLocalStorage) {
  const targetTweetObj = data.find((tweet) => tweet.uuid === tweetId);

  if (targetTweetObj.isRetweeted) {
    targetTweetObj.retweets--;
  } else {
    targetTweetObj.retweets++;
  }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
  render();
  saveToLocalStorage(data);
}

export function handleTweetBtnClick(
  tweetInput,
  data,
  render,
  saveToLocalStorage
) {
  if (tweetInput.value) {
    data.unshift({
      handle: `@Scrimba`,
      profilePic: `images/scrimbalogo.png`,
      likes: 0,
      retweets: 0,
      tweetText: tweetInput.value,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4(),
    });
    render();
    tweetInput.value = "";
  }
  saveToLocalStorage(data);
}

export function handleReplyClick(replyId) {
  document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
}

export function handleReplytoTweet(
  replyId,
  tweetReplyInput,
  data,
  render,
  saveToLocalStorage
) {
  tweetReplyInput = document.getElementById(`tweet-reply-input-${replyId}`);

  const targetTweetObj = data.find((tweet) => tweet.uuid === replyId);
  if (tweetReplyInput.value) {
    console.log(tweetReplyInput.value);
    targetTweetObj.replies.unshift({
      handle: `@Scrimba`,
      profilePic: `images/scrimbalogo.png`,
      tweetText: tweetReplyInput.value,
    });
    render();
    tweetReplyInput.value = "";
  }
  saveToLocalStorage(data);
}

export function saveToLocalStorage(data) {
  localStorage.setItem("tweetsData", JSON.stringify(data));
}

export function clearLocalStrorage() {
  localStorage.clear();
  location.reload();
}
