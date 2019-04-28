import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addWebsiteObject } from '../reducers'

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

  submitUrl = e => {
    e.preventDefault()
    const website = {...this.state}
    const { addWebsiteObject } = this.props

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
        <label for="url">Url:</label>
        <input
          id="url"
          onChange={this.onChange('url')}
          value={url}
        />
        <label for="hour">Hours:</label>
        <input
          name="hour"
          type="number"
          min="0"
          max="23"
          value={hours}
          onChange={this.onChange('hours')}
        />
        <label for="minute">Minutes:</label>
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
