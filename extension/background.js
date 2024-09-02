// background.js

import { URLChecker } from './services/url_checker.js';
import { QRScanner } from './services/qr_scanner.js';
import { AlertManager } from './utils/alert_manager.js';

const urlChecker = new URLChecker();
const qrScanner = new QRScanner();
const alertManager = new AlertManager();

// Listener to check URL when a tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        const result = urlChecker.checkURL(tab.url);
        if (result !== 'safe') {
            alertManager.showPopup(`Warning: The site ${tab.url} is considered ${result}`);
        }
    }
});

// Listener for messages from other parts of the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'checkUrl') {
        const result = urlChecker.checkURL(request.url);
        sendResponse({ result: result });
    } else if (request.action === 'scanQR') {
        const decodedURL = qrScanner.scan(request.imageData);
        const result = urlChecker.checkURL(decodedURL);
        sendResponse({ url: decodedURL, result: result });
    }
});

// Listener for the extension's installation event
chrome.runtime.onInstalled.addListener(() => {
    console.log("SafeBrowsing Extension installed.");

    // Comment out WebSocket connection if not needed right now
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
