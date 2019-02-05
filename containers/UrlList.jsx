import React, {Component} from 'react';
import { connect } from 'react-redux'

export class UrlList extends Component {
  render () {
    const { websiteObjects } = this.props

    return (
      <div>
        <h1>Url List</h1>
        <ul>
        {
          websiteObjects.map(website => <li>{website.url}</li>)
        }
        </ul>
      </div>
    )
  }
}

export const mapStateToProps = ({ websiteObjects, currentTabObject }) => ({
  currentTabObject,
  websiteObjects
})

export default connect(mapStateToProps)(UrlList)
