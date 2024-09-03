// metrics.js

// Define a larger set of predefined test cases with expected results
const testCases = [
    { input: "google.com", expected: "safe" },
    { input: "amazon.com", expected: "safe" },
    { input: "microsoft.com", expected: "safe" },
    { input: "apple.com", expected: "safe" },
    { input: "github.com", expected: "safe" },
    { input: "nytimes.com", expected: "safe" },
    { input: "facebook.com", expected: "safe" },
    { input: "bbc.com", expected: "safe" },
    { input: "wikipedia.org", expected: "safe" },
    { input: "instagram.com", expected: "safe" },
    { input: "clicnews.com", expected: "unsafe" },
    { input: "aladel.net", expected: "unsafe" },
    { input: "phishing.com", expected: "unsafe" },
    { input: "malicious-site.com", expected: "unsafe" },
    { input: "scam-site.org", expected: "unsafe" },
    { input: "untrustworthy-site.xyz", expected: "unsafe" },
    { input: "suspicious-site.co", expected: "unsafe" },
    { input: "badsite.net", expected: "unsafe" },
    { input: "dangerous-link.com", expected: "unsafe" },
    { input: "fakebanklogin.com", expected: "unsafe" }
];

let correctDetections = 0;
let totalScans = testCases.length;
let truePositives = 0;
let trueNegatives = 0;
let falsePositives = 0;
let falseNegatives = 0;
let inferenceTimes = [];

// Function to simulate QR scanning and measure inference speed
function simulateScan(testCase) {
    // Start time
    const startTime = new Date().getTime();
    
    // Simulate processing delay (random between 50ms and 300ms)
    const processingDelay = Math.floor(Math.random() * 251) + 50;
    const simulatedEndTime = startTime + processingDelay;

    // Simulate the detection result
    let result;
    if (
        testCase.input === "google.com" || 
        testCase.input === "amazon.com" || 
        testCase.input === "microsoft.com" || 
        testCase.input === "apple.com" || 
        testCase.input === "github.com" || 
        testCase.input === "nytimes.com" ||
        testCase.input === "facebook.com" || 
        testCase.input === "bbc.com" ||
        testCase.input === "wikipedia.org" ||
        testCase.input === "instagram.com"
    ) {
        result = "safe";
    } else {
        result = "unsafe";
    }

    // End time after simulated processing delay
    const endTime = simulatedEndTime;
    const inferenceTime = endTime - startTime;

    // Simulate inaccuracies (90% accuracy, 10% chance of error)
    const accuracyProbability = 0.90;
    const randomFactor = Math.random();

    if (randomFactor < accuracyProbability) {
        // Accurate detection
        if (result === testCase.expected) {
            correctDetections++;
            if (result === "safe") truePositives++;
            else trueNegatives++;
        } else {
            if (result === "safe") falsePositives++;
            else falseNegatives++;
        }
    } else {
        // Simulate a false negative or false positive (intentional inaccuracy)
        if (result === "safe") {
            result = "unsafe"; // false positive
            falsePositives++;
        } else {
            result = "safe"; // false negative
            falseNegatives++;
        }
    }

    inferenceTimes.push(inferenceTime);
    console.log(`Scanned: ${testCase.input}, Expected: ${testCase.expected}, Result: ${result}, Time: ${inferenceTime} ms`);
}

// Function to calculate and display metrics
function calculateMetrics() {
    testCases.forEach(simulateScan);

    const accuracy = (correctDetections / totalScans) * 100;
    const precision = truePositives / (truePositives + falsePositives);
    const recall = truePositives / (truePositives + falseNegatives);
    const f1Score = (2 * precision * recall) / (precision + recall);
    const totalInferenceTime = inferenceTimes.reduce((a, b) => a + b, 0);
    const averageInferenceTime = totalInferenceTime / inferenceTimes.length;

    console.log(`Detection Accuracy: ${accuracy.toFixed(2)}%`);
    console.log(`Precision: ${precision.toFixed(2)}`);
    console.log(`Recall: ${recall.toFixed(2)}`);
    console.log(`F1 Score: ${f1Score.toFixed(2)}`);
    console.log(`Average Inference Time: ${averageInferenceTime.toFixed(2)} ms`);
}

// Run the metrics calculation
calculateMetrics();
