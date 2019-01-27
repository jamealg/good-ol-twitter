let revealable = false
let readyStateCheckInterval = setInterval(function() {
	if(document.readyState === "complete") {
		init()
		clearInterval(readyStateCheckInterval)
	}
}, 10)

function init() {
	chrome.storage.local.get('revealable', function(result) {

		setTimeout(processTimeline, 100)
		revealable = result.revealable

 		let mutationTimer = 0
    let observer = new MutationObserver((mutations) => {
      clearTimeout(mutationTimer)
      mutationTimer = setTimeout(processTimeline, 2000)
    })
    observer.observe(document.querySelector('.stream'), { childList: true, subtree: true })
	})
}

function processTimeline() {
	let tweets = document.querySelectorAll('.tweet')

	for(let i=0; i<tweets.length; i++) {
		let tweet = tweets[i]
		let isRetweet = tweet.getAttribute('data-retweet-id')
		let isLikedTweet = tweet.querySelector('.context') && tweet.querySelector('.context .Icon--heartBadge')
		let isPristine = !!!tweet.getAttribute('data-good-ol-touched')
		if(isPristine && (isRetweet || isLikedTweet)) {
			tweet.setAttribute('data-good-ol-touched', true)

			if(revealable) {
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
						overflow: hidden;
					`
			} else {
				tweet.style = 'display: none;'
			}
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
