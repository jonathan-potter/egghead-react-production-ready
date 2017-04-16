import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Router from './components/router/Router'
import './index.css'

ReactDOM.render(
  <Router><App /></Router>,
  document.getElementById('root')
)
