chrome.runtime.onInstalled.addListener(() => {
    console.log("SafeBrowsing Extension installed.");
  
    // Establish WebSocket connection for real-time alerts (if necessary)
    const socket = new WebSocket("ws://localhost:8000/ws/alerts");
    
    socket.onmessage = function (event) {
      console.log("WebSocket message received:", event.data);
    };
    
    socket.onopen = function () {
      console.log("WebSocket connection established.");
    };
    
    socket.onclose = function () {
      console.log("WebSocket connection closed.");
    };
  });
  