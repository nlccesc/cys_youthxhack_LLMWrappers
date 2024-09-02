document.addEventListener('DOMContentLoaded', function () {
  // Elements
  var colorSelectors = document.querySelectorAll(".js-radio");

  // Function to set color
  var setColor = (color) => {
    document.body.className = color; // Use className to change theme
    localStorage.setItem('popupColor', color); // Save color in localStorage
  };

  // Load the saved color
  var savedColor = localStorage.getItem('popupColor');
  if (savedColor) {
    setColor(savedColor); // Apply saved color
    var savedOption = document.querySelector(`.js-radio[value="${savedColor}"]`);
    if (savedOption) savedOption.checked = true; // Ensure the correct option is checked
  } else {
    // Default to the first color option
    var defaultOption = colorSelectors[0];
    if (defaultOption) {
      setColor(defaultOption.value);
      defaultOption.checked = true;
    }
  }

  // Event listeners for each color selector
  colorSelectors.forEach(function (el) {
    el.addEventListener("click", function () {
      var value = this.value;
      setColor(value); // Set and save new color
    });
  });
});
