// extension/services/url_checker.js

class URLChecker {
    constructor() {
        this.urlScanAPI = 'https://urlscan.io/api/v1/scan/';
        this.apiKey = 'c30d7585-9121-4468-8683-4bbf17b85a8f'; // Your URLScan.io API key
    }

    async checkURL(url) {
        console.log(`Checking URL: ${url}`);
        
        // Set up the request body
        const requestBody = {
            url: url,
            visibility: 'private' // Set to 'public' if you want the scan to be available publicly
        };

        try {
            const response = await fetch(this.urlScanAPI, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'API-Key': this.apiKey
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API response error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();

            // Check if the API returned a malicious result
            // Normally, you would need to wait and check the results of the scan, but for simplicity,
            // we'll assume immediate feedback based on this initial scan request
            if (data.verdicts && data.verdicts.overall.malicious) {
                return 'danger'; // URL is considered malicious
            } else {
                return 'safe'; // URL is not considered malicious
            }
        } catch (error) {
            console.error('Error checking URL:', error);
            return 'error';
        }
    }
}

export { URLChecker };
