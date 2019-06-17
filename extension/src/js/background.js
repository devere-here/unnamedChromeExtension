import moment from 'moment'
import Url from 'url'
import _ from 'lodash'
import chromep from 'chrome-promise'
import axios from 'axios'
const baseURL = 'http://localhost:4000'

const axiosInstance = axios.create({
  baseURL,
})

const urlObject = {}

const storeNewUrl = (tab) => {
  const { id, url } = tab
  const currentWebsite = Url.parse(url).hostname
  const data = axiosInstance.get(`/redisClient?name=${website.url}`)
  if (data) {
    const { allottedTime, timeUsed } = data
    if (allottedTime < timeUsed) {
      const currentTime = moment().format('x')

      urlObject[id] = {
        startTime: currentTime,
        url: currentWebsite
      }
    } else {
      chrome.tabs.remove(id)
      chrome.tabs.create({url : 'http://poop.bike/' });
    }
  }
}

const calculateTotalTime = async (website) => {
  const currentTime = moment().format('x')
  const { data: totalTime = 0 } = await axiosInstance.get(`/?name=${website.url}`)

  return totalTime + (currentTime - website.startTime)
}

chrome.runtime.onInstalled.addListener(async function(details) {
  const { id } = await chromep.windows.getCurrent()
  const tabs = await chromep.tabs.getAllInWindow(id)

  tabs.forEach(tab => {
    storeNewUrl(tab)
  })
});

chrome.tabs.onCreated.addListener(async function(tab) {
  storeNewUrl(tab)
})

chrome.tabs.onRemoved.addListener(async function(tabId) {
  const website = urlObject[tabId]

  if (website) {
    const totalTime = await calculateTotalTime(website)
    await axiosInstance.post(`/`, { url: website.url, timeUsed: totalTime })
  }
  delete urlObject[tabId]
})

chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {

  // chrome.tabs.create({url : "soup.html"});

  // chrome.browserAction.setPopup({ popup: './soup.html' }, function(result) {
  //   console.log('in getPopup callback result is', result)
  // })
  // chrome.browserAction.setBadgeText({
  //   text: '!!!!'
  // }, function() { console.log('setBadbeText callback') })

  if (_.get(changeInfo, ['status']) === 'complete') {
    const website = urlObject[tabId]

    if (website) {
      const totalTime = await calculateTotalTime(website) || 0
      await axiosInstance.post(`/`, { url: website.url, timeUsed: totalTime })
    }
    storeNewUrl(tab)
  }
})
