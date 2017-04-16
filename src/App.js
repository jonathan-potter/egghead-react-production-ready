import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import ErrorMessage from './components/ErrorMessage'

export default class App extends Component {
  constructor () {
    super()

    this.state = {
      todos: [],
      currentTodo: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmptySubmit = this.handleEmptySubmit.bind(this)
  }

  render () {
    const { currentTodo, errorMessage, todos } = this.state

    const submitHandler = currentTodo ? this.handleSubmit : this.handleEmptySubmit

    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>React Todasdfos</h2>
        </header>
        <section className='app-body'>
          <ErrorMessage message={errorMessage} />
          <TodoForm handleInputChange={this.handleInputChange} handleSubmit={submitHandler} currentTodo={currentTodo} />
          <TodoList todos={todos} />
        </section>
      </div>
    )
  }

  handleInputChange (event) {
    this.setState({
      currentTodo: event.target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()

    const { todos, currentTodo } = this.state

    this.setState({
      todos: addTodo(todos, createTodo({ name: currentTodo })),
      currentTodo: '',
      errorMessage: ''
    })
  }

  handleEmptySubmit (event) {
    event.preventDefault()

    this.setState({
      errorMessage: 'Please set a new todo name'
    })
  }
}

let currentId = 0
const addTodo = (currentList, newTodo) => currentList.concat(newTodo)
const createTodo = ({ name }) => ({ id: currentId++, name, isComplete: false })
