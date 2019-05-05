import moment from 'moment'
import url from 'url'
import _ from 'lodash'
import chromep from 'chrome-promise'

const startTimes = {}
let lastUrl

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });
});

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    console.log('in onBeforeRequest', details)
    return { cancel: details.url.indexOf('://www.espn.com/') != -1};
  },
  {urls: ["<all_urls>"]},
  ["blocking"]);

// runs when a tab is created
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log('in onUpdated', tabId, changeInfo, tab)
  const start = new Date()
  console.log('start is', start)
})

chrome.tabs.onActiveChanged.addListener(function(tabId, changeInfo) {
  console.log('in onActiveChanged', tabId, changeInfo)
  const end = new Date()
  console.log('end is', end)
})

// runs when user goes to a new tab
chrome.tabs.onActivated.addListener(async function(activeInfo) {
  const tab = await chromep.tabs.get(activeInfo.tabId)
  const currentWebsite = url.parse(tab.url).hostname
  const currentTime = moment().format('x')

  if (startTimes[lastUrl]) {
    const result = await chromep.storage.sync.get(lastUrl)
    const totalTime = _.get(result, [lastUrl], 0)
    const watchTime = currentTime - startTimes[lastUrl]

    await chromep.storage.sync.set({[lastUrl]: totalTime + watchTime})
  }

  updateState(currentWebsite, currentTime)
})

const updateState = (currentWebsite, currentTime) => {
  delete startTimes[lastUrl]
  startTimes[currentWebsite] = currentTime
  lastUrl = currentWebsite
}

// runs when a user closes a tab
chrome.tabs.onRemoved.addListener(async function(tabId) {
  const tab = chromep.tabs.get(tabId)
  const removedWebsite = url.parse(tab.url).hostname
  const endTime = moment().format('x')

  if (startTimes[removedWebsite]) {
    const result = chromep.storage.sync.get([removedWebsite])
    const watchTime = endTime - startTimes[removedWebsite]

    await chromep.storage.sync.set({[removedWebsite]: result + watchTime})
    delete startTimes[removedWebsite]
    if (removedWebsite === lastUrl) lastUrl = ''
  }
});

// runs when a user creates a new tab
chrome.tabs.onCreated.addListener(function(tab) {
  console.log('in onCreated tab is', tab)
})

chrome.tabs.onHighlighted.addListener(function(tab) {
  console.log('in onCreated tab is', tab)
})

chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('in onClicked tab is', tab);
  const newTabConfig = {
    url: 'http://localhost:8080'
  }

  chrome.tabs.create(newTabConfig, function(tab) {
    console.log('tab is', tab)
  })
})
