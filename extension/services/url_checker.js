// background/urlChecker.js

class URLChecker {
    constructor() {
        this.threatListAPI = 'https://safebrowsing.googleapis.com/v4/threatMatches:find';
        this.apiKey = 'SB_API_KEY';
    }

    async checkURL(url) {
        console.log(`Checking URL: ${url}`);
        // placeholder to simulate checking URL
        // make api request here
        if (url.includes('malicious')) {
            return 'danger';
        } else {
            return 'safe';
        }
    }
}

export { URLChecker };
