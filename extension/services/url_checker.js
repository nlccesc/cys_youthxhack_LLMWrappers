class URLChecker {
    constructor() {
        this.threatListAPI = 'https://safebrowsing.googleapis.com/v4/threatMatches:find';
        this.apiKey = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your actual API key
    }

    async checkURL(url) {
        console.log(`Checking URL: ${url}`);
        
        // Set up the request body according to the API specification
        const requestBody = {
            client: {
                clientId: "yourcompanyname",
                clientVersion: "1.0"
            },
            threatInfo: {
                threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
                platformTypes: ["ANY_PLATFORM"],
                threatEntryTypes: ["URL"],
                threatEntries: [
                    { url: url }
                ]
            }
        };

        try {
            const response = await fetch(`${this.threatListAPI}?key=${this.apiKey}`, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();

            // Check if the API returned any threat matches
            if (data && data.matches && data.matches.length > 0) {
                return 'danger';
            } else {
                return 'safe';
            }
        } catch (error) {
            console.error('Error checking URL:', error);
            return 'error';
        }
    }
}

export { URLChecker };
