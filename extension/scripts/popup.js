document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const scanButton = document.getElementById('scanButton');
    const autoDetectToggle = document.getElementById('autoDetectToggle');
    const optionsLink = document.querySelector(".js-options");
  
    // Load saved color and apply it to the popup
    const savedColor = localStorage.getItem('popupColor');
    if (savedColor) {
      document.body.className = savedColor; // Update theme based on saved color
    }
  
    // Load saved auto-detect preference
    const autoDetectEnabled = localStorage.getItem('autoDetect') === 'true';
    if (autoDetectToggle) autoDetectToggle.checked = autoDetectEnabled;
  
    // Listen for toggle changes
    autoDetectToggle.addEventListener('change', function() {
      localStorage.setItem('autoDetect', this.checked);
    });
  
    // Example for sending a message to content script or background script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: {tabId: activeTab.id},
        func: () => {
          // Content script logic
        }
      });
    });
  
    const scanButton = document.getElementById('scanButton');
    scanButton.addEventListener('click', async function () {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (tab && tab.url) {
            chrome.runtime.sendMessage({ action: 'checkUrl', url: tab.url }, (response) => {
                if (response.result !== 'safe') {
                    alert(`Warning: The site ${tab.url} is considered ${response.result}`);
                } else {
                    alert('The site is safe.');
                }
            });
        }
    });
  
    const optionsLink = document.querySelector(".js-options");
    optionsLink.addEventListener("click", function (e) {
      e.preventDefault();
      chrome.tabs.create({ 'url': chrome.runtime.getURL('options.html') });
    });
  });
  