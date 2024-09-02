document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme and automatic detection preference
    const savedColor = localStorage.getItem('popupColor');
    const autoDetectEnabled = localStorage.getItem('autoDetect') === 'true';
  
    if (savedColor) {
      document.body.className = savedColor; // Update theme
    }
  
    // Set the state of the toggle based on saved preference
    const autoDetectToggle = document.getElementById('autoDetectToggle');
    autoDetectToggle.checked = autoDetectEnabled;
  
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
    scanButton.addEventListener('click', function() {
      // Implement scan functionality here
    });
  
    const optionsLink = document.querySelector(".js-options");
    optionsLink.addEventListener("click", function (e) {
      e.preventDefault();
      chrome.tabs.create({ 'url': chrome.runtime.getURL('options.html') });
    });
  });
  