// popup.js

document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById("app");

  // Assuming this part is no longer needed since it relied on 'storage'
  /*
  storage.get('color', function(resp) {
      const color = resp.color;
      if (color) {
          popup.style.backgroundColor = color;
      }
  });
  */

  const template = (data) => {
      const json = JSON.stringify(data);
      return (`
      <div class="site-description">
          <h3 class="title">${data.title}</h3>
          <p class="description">${data.description}</p>
          <a href="${data.url}" target="_blank" class="url">${data.url}</a>
      </div>
      <div class="action-container">
          <button data-bookmark='${json}' id="save-btn" class="btn btn-primary">Save</button>
      </div>
      `);
  };

  const renderMessage = (message) => {
      const displayContainer = document.getElementById("display-container");
      displayContainer.innerHTML = `<p class='message'>${message}</p>`;
  };

  const renderBookmark = (data) => {
      const displayContainer = document.getElementById("display-container");
      if (data) {
          const tmpl = template(data);
          displayContainer.innerHTML = tmpl;
      } else {
          renderMessage("Sorry, could not extract this page's title and URL");
      }
  };

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: 'process-page' }, renderBookmark);
  });

  popup.addEventListener("click", function (e) {
      if (e.target && e.target.matches("#save-btn")) {
          e.preventDefault();
          const data = e.target.getAttribute("data-bookmark");
          chrome.runtime.sendMessage({ action: "perform-save", data: data }, function (response) {
              if (response && response.action === "saved") {
                  renderMessage("Your bookmark was saved successfully!");
              } else {
                  renderMessage("Sorry, there was an error while saving your bookmark.");
              }
          });
      }
  });

  const optionsLink = document.querySelector(".js-options");
  optionsLink.addEventListener("click", function (e) {
      e.preventDefault();
      chrome.tabs.create({ 'url': chrome.runtime.getURL('options.html') });
  });
});
