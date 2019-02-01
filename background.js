chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });
});

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    console.log('details are', details)
    return { cancel: details.url.indexOf('://www.espn.com/') != -1};
  },
  {urls: ["<all_urls>"]},
  ["blocking"]);

// runs when a tab is created
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log('in onUpdated', tabId, changeInfo, tab)
})

// runs when user goes to a new tab
chrome.tabs.onActivated.addListener(function(activeInfo) {
  console.log('in onActivated props are', activeInfo)

  chrome.tabs.get(activeInfo.tabId, function(tab) {
    console.log('in get tab is', tab)
  })
})

// runs when a user closes a tab
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  console.log('in onRemoved', tabId, removeInfo)
  chrome.tabs.get(tabId, function(tab) {
    console.log('onRemoved in get tab is', tab)
  })
})

// runs when a user creates a new tab
chrome.tabs.onCreated.addListener(function(tab) {
  console.log('in onCreated tab is', tab)
})

chrome.tabs.onHighlighted.addListener(function(tab) {
  console.log('in onCreated tab is', tab)
})
