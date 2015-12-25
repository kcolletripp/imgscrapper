// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

// This block is new!
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      //chrome.tabs.create({"url": request.url});

      //this removes the anchor at the end, if there is one
      var path = request.url.substring(0, (request.url.indexOf("#") == -1) ? request.url.length : request.url.indexOf("#"));
      //this removes the query after the file name, if there is one
      path = path.substring(0, (path.indexOf("?") == -1) ? path.length : path.indexOf("?"));
      path = "img/" + path.substring(path.lastIndexOf('/')+1);
      console.log(path);
      chrome.downloads.download({ url: request.url, filename: path })
    }
  }
);
