import React, { Component } from 'react'

export default class Router extends Component {
  state = {
    route: getCurrentPath()
  }

  render () {
    const { children } = this.props

    return <div>{children}</div>
  }

  handleLinkClick = route => {
    this.setState({ route })
    history.pushState(null, '', route)
  }

  static childContextTypes = {
    route: React.PropTypes.string,
    linkHandler: React.PropTypes.func
  }

  getChildContext () {
    const { route } = this.state

    return {
      linkHandler: this.handleLinkClick,
      route
    }
  }

  componentDidMount () {
    window.addEventListener('popstate', () => {
      this.setState({
        route: getCurrentPath()
      })
    })
  }
}

function getCurrentPath () {
  const path = document.location.pathname

  return path.substring(path.lastIndexOf('/'))
}
