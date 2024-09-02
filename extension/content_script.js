// content_script.js

chrome.runtime.sendMessage({ action: 'checkUrl', url: window.location.href }, response => {
  if (response.result !== 'safe') {
      alert(`Warning: The site ${window.location.href} is considered ${response.result}`);
  }
});