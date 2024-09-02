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
  
    // Event listener for the scan button
    if (scanButton) {
      scanButton.addEventListener('click', function () {
        // Implement scan functionality here
        console.log('Scan started');
      });
    }
  
    // Event listener for the auto-detect toggle
    if (autoDetectToggle) {
      autoDetectToggle.addEventListener('change', function () {
        localStorage.setItem('autoDetect', this.checked);
      });
    }
  
    // Event listener for the options link
    if (optionsLink) {
      optionsLink.addEventListener("click", function (e) {
        e.preventDefault();
        chrome.tabs.create({ 'url': chrome.runtime.getURL('options.html') });
      });
    }
  });
  