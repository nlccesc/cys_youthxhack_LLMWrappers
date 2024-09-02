<<<<<<< Updated upstream
=======
// extension/content_script.js

>>>>>>> Stashed changes
chrome.runtime.onInstalled.addListener(() => {
  console.log("SafeBrowsing Extension installed.");

  // Establish WebSocket connection for real-time alerts
  const socket = new WebSocket("ws://localhost:8000/ws/alerts");

  socket.onmessage = function (event) {
      console.log("WebSocket message received:", event.data);
      chrome.runtime.sendMessage({ action: "showAlert", message: event.data });
  };

  socket.onopen = function () {
      console.log("WebSocket connection established.");
  };

  socket.onclose = function () {
      console.log("WebSocket connection closed.");
  };
});

// Listen for DOM changes to detect pop-ups
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded and parsed');
  detectPopups();
});

function detectPopups() {
  const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
          if (mutation.addedNodes.length > 0) {
              mutation.addedNodes.forEach(node => {
                  if (node.nodeType === 1 && node.tagName === 'IFRAME') {
                      chrome.runtime.sendMessage({ action: 'popupDetected', url: node.src });
                  }
              });
          }
      });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
