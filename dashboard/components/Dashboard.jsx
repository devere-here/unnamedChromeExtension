import React, {Component} from 'react'
import axios from 'axios'
import AddNewUrl from './AddNewUrl.jsx'
import UrlList from './UrlList.jsx'
const baseURL = 'http://localhost:4000'
const axiosInstance = axios.create({
  baseURL,
})

export default class Dashboard extends Component {
  render () {
    return (
      <div>
        <h1>This is the Dashboard</h1>
        <AddNewUrl />
        <UrlList />
        <button onClick={async () => {
          const data = axiosInstance.get('/all')
          console.log('data is', data)
        }}>meow</button>
      </div>
    )
  }
}
