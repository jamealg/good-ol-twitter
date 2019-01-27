document.addEventListener('DOMContentLoaded', function () {
  let revealableInput = document.querySelector('#revealable')
  chrome.storage.local.get('revealable', function ({revealable}) {
      revealableInput.checked = revealable
  })

  revealableInput.addEventListener('change', function(event) {
    if(event.target.checked) {
      chrome.storage.local.set({'revealable': true})
    } else {
      chrome.storage.local.set({'revealable': false})
    }
  })
})
