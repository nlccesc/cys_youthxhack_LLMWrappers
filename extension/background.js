// background/background.js
import { URLChecker } from 'services/url_checker.js';
import { QRScanner } from '../services/qr_scanner.js';
import { AlertManager } from '../utils/alert_manager.js';



const urlChecker = new URLChecker();
const qrScanner = new QRScanner();
const alertManager = new AlertManager();

// listener to check url
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        const result = urlChecker.checkURL(tab.url);
        if (result !== 'safe') {
            alertManager.showPopup(`Warning: The site ${tab.url} is considered ${result}`);
        }
    }
});

// listener for messages from other parts of the extension (e.g., UI, content scripts)
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
