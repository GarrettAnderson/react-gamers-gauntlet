import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Reducer from './Reducer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(Reducer)

ReactDOM.render(
  
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)