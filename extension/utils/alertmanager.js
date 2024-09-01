class AlertManager {
    showPopup(message) {
        chrome.notifications.create('', {
            type: 'basic',
            iconUrl: 'icons/icon48.png',
            title: 'Security Alert',
            message: message
        });
    }

    showAlert(message) {
        alert(message); // testing
    }
}

export { AlertManager };
