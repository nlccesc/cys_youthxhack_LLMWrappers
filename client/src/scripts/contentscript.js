import ext from "./utils/ext";

var extractTags = () => {
  var url = document.location.href;
  if(!url || !url.match(/^http/)) return;

  var data = {
    title: "",
    description: "",
    url: document.location.href
  }

  var ogTitle = document.querySelector("meta[property='og:title']");
  if(ogTitle) {
    data.title = ogTitle.getAttribute("content")
  } else {
    data.title = document.title
  }

  var descriptionTag = document.querySelector("meta[property='og:description']") || document.querySelector("meta[name='description']")
  if(descriptionTag) {
    data.description = descriptionTag.getAttribute("content")
  }

  return data;
}

function onRequest(request, sender, sendResponse) {
  if (request.action === 'process-page') {
    sendResponse(extractTags())
  }
}

ext.runtime.onMessage.addListener(onRequest);



// Import necessary libraries
import jsQR from "jsqr";
import Tesseract from "tesseract.js";

// Listen for clicks on the document
document.addEventListener("click", async function (event) {
  const element = event.target;
  
  if (element.tagName === "A") {
    // If the clicked element is a link, get its URL
    const url = element.href;
    console.log("URL clicked:", url);

    // Send the URL to the backend for verification
    verifyURL(url);
  }

  if (element.tagName === "IMG") {
    // If the clicked element is an image, check for QR codes
    const img = element;
    const qrUrl = await parseQRCodeFromImage(img);

    if (qrUrl) {
      console.log("QR Code URL:", qrUrl);
      // Send the QR URL to the backend for verification
      verifyURL(qrUrl);
    }
  }
});

// Function to verify URL through the backend API
async function verifyURL(url) {
  try {
    const response = await fetch("http://localhost:8000/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: url })
    });

    const data = await response.json();
    if (data.result === "unsafe") {
      alertUser(data.content, data.result);
    }
  } catch (error) {
    console.error("Error verifying URL:", error);
  }
}

// Function to parse QR code from an image
async function parseQRCodeFromImage(image) {
  // Create a canvas to draw the image
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // Extract image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const code = jsQR(imageData.data, imageData.width, imageData.height);

  if (code) {
    return code.data;
  } else {
    return null;
  }
}

// Function to alert user of an unsafe URL
function alertUser(url, result) {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
  overlay.style.color = "white";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "9999";
  overlay.innerText = "Warning: Unsafe Content Detected!";
  
  document.body.appendChild(overlay);

  setTimeout(() => {
    document.body.removeChild(overlay);
  }, 5000);
}