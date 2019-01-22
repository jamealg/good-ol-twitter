var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval)
		setTimeout(processTimeline, 100)

 		let mutationTimer = 0
      let observer = new MutationObserver((mutations) => {
        clearTimeout(mutationTimer)
        mutationTimer = setTimeout(processTimeline, 2000)
      })
      observer.observe(document.querySelector('.stream'), { childList: true, subtree: true })
	}
}, 10)

function processTimeline() {
	let tweets = document.querySelectorAll('.tweet')
	console.log(tweets.length)
	for(let i=0; i<tweets.length; i++) {
		let tweet = tweets[i]
		let isRetweet = tweet.getAttribute('data-retweet-id')
		let isLikedTweet = tweet.querySelector('.context') && tweet.querySelector('.context .Icon--heartBadge')
		let isPristine = !!!tweet.getAttribute('data-good-ol-touched')
		if(isPristine && (isRetweet || isLikedTweet)) {
			//tweet.style = 'display: none;'
			tweet.setAttribute('data-good-ol-touched', true)
				let frag = document.createRange().createContextualFragment(`
					<div style="
						position: absolute;
				    top: 0;
				    left: 0;
				    width: 100%;
				    height: 101%;
				    background: #e6ecf0;
				    z-index: 101;
				    display: flex;
				    align-items: center;
				    justify-content: center;
						color: rgba(0,0,0,0.5);
					">
						Reveal ${(isRetweet) ? 'retweet' : 'liked tweet'}
					</div>
				`)
				tweet.appendChild(frag)
				tweet.addEventListener("click", revealTweet)
				tweet.style = `
					height: 70px;
				`
		}
	}
}

function revealTweet(Event) {
	event.preventDefault()
	event.stopPropagation()
	let el = event.target
	el.style = ''
	el.parentNode.style = ''
	el.remove()
}
