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
    var canvas = document.querySelector(".kix-canvas-tile-content");
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillText(newText, 10, 20);
  }
});

document
  .getElementById("connect-btn")
  .addEventListener("click", async function () {
    const room = new LivekitClient.Room();

    const url = "wss://auto-web-11iwp7z9.livekit.cloud";

    const token = "eyJhbGciOiJIUzI1NiJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6InJvb20tMTg3In0sImlzcyI6IkFQSWJ1ZEpjVHVRVm9zUiIsImV4cCI6MTcxNjgxNDA5MiwibmJmIjowLCJzdWIiOiJ1c2VyLTE4NyJ9.2TtINgdQ-2TrqURqXadOKUJ0zSGmMX_Gsq5NppNeWHE";

    room.prepareConnection(url, token);

    await room.connect(url, token);
    console.log("connected to room", room.name);
    alert("Connected to room: " + room.name);
  });
