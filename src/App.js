import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

export default class App extends Component {
  constructor () {
    super()

    this.state = {
      todos: [
        { id: 1, name: 'Learn stuff', isComplete: false },
        { id: 2, name: 'Learn stuff', isComplete: false },
        { id: 3, name: 'Learn stuff', isComplete: false },
        { id: 4, name: 'Learn stuff', isComplete: true },
        { id: 5, name: 'Learn stuff', isComplete: false },
        { id: 6, name: 'Learn stuff', isComplete: false },
        { id: 7, name: 'Learn stuff', isComplete: false },
        { id: 8, name: 'Learn stuff', isComplete: false },
        { id: 9, name: 'Learn stuff', isComplete: false }
      ],
      currentTodo: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>React Todos</h2>
        </header>
        <section className='app-body'>
          <form>
            <input type='text' onChange={this.handleInputChange} value={this.state.currentTodo} />
          </form>
          { this.renderTodos() }
        </section>
      </div>
    )
  }

  renderTodos () {
    const { todos } = this.state

    return (
      <ul>
        { todos.map(this.renderTodo) }
      </ul>
    )
  }

  renderTodo ({ id, isComplete, name }) {
    return (
      <li key={id}>
        <input type='checkbox' defaultChecked={isComplete} />
        {name}
      </li>
    )
  }

  handleInputChange (event) {
    this.setState({
      currentTodo: event.target.value
    })
  }
}
