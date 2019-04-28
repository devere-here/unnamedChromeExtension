import React, {Component} from 'react';
import AddNewUrl from './AddNewUrl.jsx'
import UrlList from './UrlList.jsx'

export default class Dashboard extends Component {
  render () {
    return (
      <div>
        <h1>This is the Dashboard</h1>
        <AddNewUrl />
        <UrlList />
      </div>
    )
  }
}
