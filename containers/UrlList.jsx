import React, {Component} from 'react';
import { connect } from 'react-redux'
import TableHeader from './TableHeader'
import style from './style.scss'

export class UrlList extends Component {
  render () {
    const { websiteObjects } = this.props

    return (
      <div>
        <h1>Url List</h1>
        <TableHeader />
        <ul className={style.container}>
          {
            websiteObjects.map(website => (
            <li className={style.listItem}>
              <div className={style.url}>{website.url}</div>
              <div className={style.totalTime}>
                <span>{website.hours}</span>:
                <span>{website.minutes}</span>
              </div>
              <div className={style.totalTimeRemaining}>
                <span>{website.hours}</span>:
                <span>{website.minutes}</span>
              </div>
            </li>))
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
