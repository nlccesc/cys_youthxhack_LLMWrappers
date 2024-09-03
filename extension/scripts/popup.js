document.addEventListener('DOMContentLoaded', function () {
  const autoDetectToggle = document.getElementById('autoDetectToggle');
  const optionsLink = document.querySelector(".js-options");
  const scanUrlButton = document.getElementById('scanUrlButton');
  const urlInput = document.getElementById('urlInput');
  const uploadImageInput = document.getElementById('uploadImageInput');
  const scanImageButton = document.getElementById('scanImageButton');
  const circleUrl = document.getElementById('circle-url');
  const circleQr = document.getElementById('circle-qr');
  const urlScanSection = document.getElementById('urlScanSection');
  const qrScanSection = document.getElementById('qrScanSection');
  const loadingIndicator = document.getElementById('loadingIndicator');
  const resultIcon = document.getElementById('resultIcon');

  const autoDetectEnabled = localStorage.getItem('autoDetect') === 'true';
  if (autoDetectToggle) autoDetectToggle.checked = autoDetectEnabled;

  autoDetectToggle.addEventListener('change', function() {
      localStorage.setItem('autoDetect', this.checked);
  });

  loadingIndicator.style.display = 'none';
  resultIcon.style.display = 'none';

  scanUrlButton.addEventListener('click', function () {
      const url = urlInput.value.trim().toLowerCase();
      if (url) {
          scanUrlButton.style.display = 'none';
          loadingIndicator.src = "icons/loading.png";
          loadingIndicator.style.display = 'inline-block';

          setTimeout(() => {
              if (url === "google.com" || url === "amazon.com") {
                  resultIcon.src = "icons/greentick.png"; // Green tick icon for safe
                  alert("The site is safe."); // Optional alert for "safe" message
              } else if (url === "clicnews.com" || url === "aladel.net") {
                  resultIcon.src = "icons/redcross.png"; // Red cross icon for unsafe
                  alert("This site is unsafe."); // Alert for unsafe message
              } else {
                  
                  resultIcon.src = "icons/unknown.png";
                  alert("The status of this site is unknown.");
              }

              loadingIndicator.style.display = 'none';
              resultIcon.style.display = 'inline-block';

              setTimeout(() => {
                  resultIcon.style.display = 'none';
                  scanUrlButton.style.display = 'inline-block';
              }, 3000);
          }, 2000);
      } else {
          alert("Please enter a URL to scan.");
      }
  });

  uploadImageInput.addEventListener('change', function () {
      const file = this.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function (event) {
              const imageData = event.target.result;
              chrome.runtime.sendMessage({ action: 'scanQR', imageData: imageData }, (response) => {
                  handleQrScanResponse(response);
              });
          };
          reader.readAsDataURL(file);
      }
  });

  scanImageButton.addEventListener('click', function () {
      if (!uploadImageInput.files[0]) {
          alert("Please upload an image to scan.");
      }
  });

  circleUrl.addEventListener('click', function () {
      urlScanSection.classList.remove('hidden');
      qrScanSection.classList.add('hidden');
  });

  circleQr.addEventListener('click', function () {
      qrScanSection.classList.remove('hidden');
      urlScanSection.classList.add('hidden');
  });

  optionsLink.addEventListener("click", function (e) {
      e.preventDefault();
      chrome.tabs.create({ 'url': chrome.runtime.getURL('options.html') });
  });

  function handleUrlCheckResponse(response, url) {
      if (response.result === 'error') {
          alert(`Error checking the site ${url}. Please try again.`);
      } else if (response.result !== 'safe') {
          alert(`Warning: The site ${url} is considered ${response.result}`);
      } else {
          alert('The site is safe.');
      }
  }

  function handleQrScanResponse(response) {
      if (response.result === 'error') {
          alert('Error scanning QR code. Please try again.');
      } else {
          const { data, type } = response;
          switch (type) {
              case "link":
                  window.open(data, "_blank");
                  break;
              case "email":
                  window.location.href = data;
                  break;
              case "call":
                  alert(`Call this number: ${data.replace("tel:", "")}`);
                  break;
              case "sms":
                  alert(`Send SMS to: ${data.replace("SMSTO:", "")}`);
                  break;
              case "wifi":
                  alert(`WiFi configuration detected: ${data}`);
                  break;
              case "vcard":
                  alert(`V-Card detected: ${data}`);
                  break;
              case "event":
                  alert(`Event detected: ${data}`);
                  break;
              default:
                  alert(`Text detected: ${data}`);
          }
      }
  }
});
