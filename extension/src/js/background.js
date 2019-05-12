import moment from 'moment'
import url from 'url'
import _ from 'lodash'
import chromep from 'chrome-promise'
import axios from 'axios'
const baseURL = 'http://localhost:4000'

const startTimes = {}
let lastUrl

const axiosInstance = axios.create({
  baseURL,
})

// runs when user goes to a new tab
chrome.tabs.onActivated.addListener(async function(activeInfo) {
  const tab = await chromep.tabs.get(activeInfo.tabId)
  const currentWebsite = url.parse(tab.url).hostname
  const currentTime = moment().format('x')
  const redisData = await axiosInstance.get(`/?name=${currentWebsite}`)

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
  const tab = await chromep.tabs.get(tabId)
  const removedWebsite = url.parse(tab.url).hostname
  const endTime = moment().format('x')

  if (startTimes[removedWebsite]) {
    const result = chromep.storage.sync.get([removedWebsite])
    const watchTime = endTime - startTimes[removedWebsite]

    await chromep.storage.sync.set({[removedWebsite]: result + watchTime})
    const redisData = await axiosInstance.post(`/`, { url: removedWebsite, time: result + watchTime})

    delete startTimes[removedWebsite]
    if (removedWebsite === lastUrl) lastUrl = ''
  }
});
