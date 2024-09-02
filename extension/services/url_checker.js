<<<<<<< Updated upstream
// background/urlChecker.js
=======
import axios from 'axios';
>>>>>>> Stashed changes

class URLChecker {
    constructor() {
        this.threatListAPI = 'https://safebrowsing.googleapis.com/v4/threatMatches:find';
<<<<<<< Updated upstream
        this.apiKey = 'SB_API_KEY';
=======
        this.apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
>>>>>>> Stashed changes
    }

    async checkURL(url) {
        console.log(`Checking URL: ${url}`);
<<<<<<< Updated upstream
        // placeholder to simulate checking URL
        // make api request here
        if (url.includes('malicious')) {
            return 'danger';
        } else {
            return 'safe';
=======
        
        const requestBody = {
            client: {
                clientId: "yourcompanyname",
                clientVersion: "1.0"
            },
            threatInfo: {
                threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
                platformTypes: ["ANY_PLATFORM"],
                threatEntryTypes: ["URL"],
                threatEntries: [{ url: url }]
            }
        };

        try {
            const response = await axios.post(`${this.threatListAPI}?key=${this.apiKey}`, requestBody, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data && response.data.matches && response.data.matches.length > 0) {
                return 'danger';
            } else {
                return 'safe';
            }
        } catch (error) {
            console.error('Error checking URL:', error);
            return 'error';
>>>>>>> Stashed changes
        }
    }
}

export { URLChecker };
