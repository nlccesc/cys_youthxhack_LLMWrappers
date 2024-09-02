import { URLChecker } from './services/url_checker.js';
import { QRScanner } from './services/qr_scanner.js';
import { AlertManager } from './utils/alert_manager.js';

const urlChecker = new URLChecker();
const qrScanner = new QRScanner();
const alertManager = new AlertManager();

// Listener to check URL when a tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        urlChecker.checkURL(tab.url).then(result => {
            if (result !== 'safe') {
                alertManager.showPopup(`Warning: The site ${tab.url} is considered ${result}`);
            }
        });
    }
});

// Listener for messages from other parts of the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'checkUrl') {
        urlChecker.checkURL(request.url).then(result => {
            sendResponse({ result: result });
        });
    } else if (request.action === 'scanQR') {
        const decodedURL = qrScanner.scan(request.imageData);
        urlChecker.checkURL(decodedURL).then(result => {
            sendResponse({ url: decodedURL, result: result });
        });
    }
    return true; // Necessary to use sendResponse asynchronously
});

// Listener for the extension's installation event
chrome.runtime.onInstalled.addListener(() => {
    console.log("SafeBrowsing Extension installed.");
});
