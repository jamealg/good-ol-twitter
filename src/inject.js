var readyStateCheckInterval = setInterval(function() {

	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		setTimeout(processTimeline,100)

 		let mutationTimer = 0
      let observer = new MutationObserver((mutations) => {
        clearTimeout(mutationTimer)
				console.log('mutate')
        mutationTimer = setTimeout(processTimeline, 2000)
      })
      observer.observe(document.querySelector('.stream'), { childList: true, subtree: true })



	}

}, 10);

function processTimeline() {
	let tweets = document.querySelectorAll('.tweet')
	console.log(tweets.length)
	for(let i=0; i<tweets.length; i++) {
		let tweet = tweets[i]
		let isRetweet = tweet.getAttribute('data-retweet-id')
		let isLikedTweet = tweet.querySelector('.context').querySelector('.Icon--heartBadge')

		if(isRetweet || isLikedTweet) {
			tweet.style = 'display: none;'
			//tweet.style = 'opacity: 0.35';
			console.log('got one')
		}
	}
}
