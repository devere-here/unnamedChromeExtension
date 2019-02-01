import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from '../reducers'
import Dashboard from './Dashboard.jsx'

const store = createStore(reducers)

const App = () => (
  <Provider store={store}>
    <Dashboard />
  </Provider>
)

export default App
