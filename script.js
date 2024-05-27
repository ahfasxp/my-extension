document.getElementById("btn").addEventListener("click", function () {
  // Get the text from the input field
  var newTitle = document.getElementById("title").value;
  if (newTitle) {
    // Send the text to the background script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: updatetitle,
        args: [newTitle],
      });
    });
  }

  var newContent = document.getElementById("content").value;
  if (newContent) {
    // Send the text to the background script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: updatecontent,
        args: [newContent],
      });
    });
  }

  // Update the text in the input field
  function updatetitle(newText) {
    var element = document.getElementById("docs-title-input-label-inner");
    if (element) {
      element.textContent = newText;
    } else {
      alert('Element with ID "docs-title-input-label-inner" not found.');
    }
  }

  // Update the text in the input field
  function updatecontent(newText) {
    var canvas = document.querySelector('.kix-canvas-tile-content');
    var ctx = canvas.getContext('2d');
    ctx.font = '30px Arial';
    ctx.fillText(newText, 10, 20);
  }
});
