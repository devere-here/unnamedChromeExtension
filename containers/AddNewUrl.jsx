import React, {Component} from 'react';

export default class AddNewUrl extends Component {
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
      </div>
    )
  }
}
