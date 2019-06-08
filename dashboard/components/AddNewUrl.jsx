import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { addWebsiteObject } from '../reducers'
import { convertToMS } from '../helpers'
const baseURL = 'http://localhost:4000'
const axiosInstance = axios.create({
  baseURL,
})

class AddNewUrl extends Component {
  state = {
    url: '',
    hours: 0,
    minutes: 0,
  }

  onChange = type => e => {
    e.preventDefault()
    this.setState({
      [type]: e.target.value
    })
  }

  submitUrl = async e => {
    e.preventDefault()
    const website = {...this.state}
    const { addWebsiteObject } = this.props
    const websiteData = {
      url: website.url,
      allotedTime: convertToMS(website.hours, website.minutes)
    }
    await axiosInstance.post('/', websiteData)

    addWebsiteObject(website)
    this.setState({
      url: '',
      hours: 0,
      minutes: 0,
    })
  }

  render () {
    const { url, hours, minutes } = this.state

    return (
      <div>
        <h1>AddNewUrl</h1>
        <label htmlFor="url">Url:</label>
        <input
          id="url"
          onChange={this.onChange('url')}
          value={url}
        />
        <label htmlFor="hour">Hours:</label>
        <input
          name="hour"
          type="number"
          min="0"
          max="23"
          value={hours}
          onChange={this.onChange('hours')}
        />
        <label htmlFor="minute">Minutes:</label>
        <input
          name="minute"
          type="number"
          min="0"
          max="59"
          value={minutes}
          onChange={this.onChange('minutes')}
        />
        <button onClick={this.submitUrl}>Submit</button>
      </div>
    )
  }
}

const mapStateToProps = ({ websiteObjects, currentTabObject }) => ({
  currentTabObject,
  websiteObjects
})

const mapDispatchToProps = dispatch => ({
  addWebsiteObject: (website) => dispatch(addWebsiteObject(website))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNewUrl)
