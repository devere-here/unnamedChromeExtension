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
  const currentTime = moment().format('x')

  urlObject[id] = {
    startTime: currentTime,
    url: currentWebsite
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
  const totalTime = await calculateTotalTime(website)

  await axiosInstance.post(`/`, { url: website.url, time: totalTime})
  delete urlObject[tabId]
})

chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
  if (_.get(changeInfo, ['status']) === 'complete') {
    const website = urlObject[tabId]
    const totalTime = await calculateTotalTime(website) || 0

    await axiosInstance.post(`/`, { url: website.url, time: totalTime })
    storeNewUrl(tab)
  }
})
