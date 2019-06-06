import React, {Component} from 'react';
import { connect } from 'react-redux'
import TableHeader from './TableHeader'
import UrlItem from './UrlItem.jsx'
import style from './style.scss'

export class UrlList extends Component {
  render () {
    const { websites } = this.props

    return (
      <div>
        <h1>Url List</h1>
        <TableHeader />
        <ul className={style.container}>
          {
            websites && websites.map(website => (
              <UrlItem key={website.url} website={website} />
            ))
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
