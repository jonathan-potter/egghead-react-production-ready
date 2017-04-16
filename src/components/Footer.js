import React, { Component } from 'react'

export default function Footer () {
  return (
    <footer>
      <nav>
        <Link to='/'>all</Link>
        <Link to='/active'>active</Link>
        <Link to='/complete'>complete</Link>
      </nav>
    </footer>
  )
}

class Link extends Component {
  static contextTypes = {
    linkHandler: React.PropTypes.func
  }

  handleClick = event => {
    event.preventDefault()

    const { linkHandler } = this.context
    const { to } = this.props

    linkHandler(to)
  }

  render () {
    return (
      <a href="#" onClick={this.handleClick}>
        {this.props.children}
      </a>
    )
  }
}
