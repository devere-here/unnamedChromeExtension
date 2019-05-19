import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import AddNewUrl from './AddNewUrl.jsx'
import UrlList from './UrlList.jsx'
import { initWebsiteList } from '../reducers'

const baseURL = 'http://localhost:4000'
const axiosInstance = axios.create({
  baseURL,
})

class Dashboard extends Component {
  async componentDidMount() {
    const { data } = await axiosInstance.get('/all')

    this.props.initWebsiteList(data)
  }

  render () {
    const { websites } = this.props

    return (
      <div>
        <h1>This is the Dashboard</h1>
        <AddNewUrl />
        <UrlList websites={websites} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ websites: state })
const mapDispatchToProps = { initWebsiteList }

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
