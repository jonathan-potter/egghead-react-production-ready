import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import ErrorMessage from './components/ErrorMessage'
import Footer from './components/Footer'

export default class App extends Component {
  static contextTypes = {
    route: React.PropTypes.string
  }

  state = {
    todos: [
      { id: 4, name: 'rawr', isComplete: false},
      { id: 7, name: 'stuff', isComplete: true},
      { id: 2, name: 'things', isComplete: false}
    ],
    currentTodo: '',
    errorMessage: ''
  }

  render () {
    const { route } = this.context
    const { currentTodo, errorMessage, todos } = this.state

    const submitHandler = currentTodo ? this.handleSubmit : this.handleEmptySubmit
    const todosToDisplay = filterTodosForRoute(todos, route)

    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>React Todos</h2>
        </header>
        <section className='app-body'>
          <ErrorMessage message={errorMessage} />
          <TodoForm handleInputChange={this.handleInputChange} handleSubmit={submitHandler} currentTodo={currentTodo} />
          <TodoList todos={todosToDisplay} handleToggle={this.handleToggle} handleRemove={this.handleRemove} />
        </section>
        <Footer />
      </div>
    )
  }

  handleInputChange = (event) => {
    this.setState({
      currentTodo: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { todos, currentTodo } = this.state

    this.setState({
      todos: addTodo(todos, createTodo({ name: currentTodo })),
      currentTodo: '',
      errorMessage: ''
    })
  }

  handleToggle = id => {
    const { todos } = this.state

    const todo = findById(todos, id)

    this.setState({
      todos: updateTodo(todos, toggleTodo(todo))
    })
  }

  handleEmptySubmit = (event) => {
    event.preventDefault()

    this.setState({
      errorMessage: 'Please set a new todo name'
    })
  }

  handleRemove = (id, event) => {
    event.preventDefault()

    const { todos } = this.state

    this.setState({
      todos: removeTodo(todos, id)
    })
  }
}

let currentId = 0
const addTodo = (currentList, newTodo) => currentList.concat(newTodo)
const createTodo = ({ name }) => ({ id: currentId++, name, isComplete: false })
const findById = (list, id) => list.find(todo => todo.id === id)
const toggleTodo = todo => ({ ...todo, isComplete: !todo.isComplete })
const updateTodo = (list, updatedTodo) => {
  const updatedIndex = list.findIndex(todo => todo.id === updatedTodo.id)

  return [
    ...list.slice(0, updatedIndex),
    updatedTodo,
    ...list.slice(updatedIndex + 1)
  ]
}
const removeTodo = (list, id) => {
  const removedIndex = list.findIndex(todo => todo.id === id)

  return [
    ...list.slice(0, removedIndex),
    ...list.slice(removedIndex + 1)
  ]
}
const filterTodosForRoute = (todos, route) => {
  switch (route) {
    case '/active':
      return todos.filter(todo => !todo.isComplete)
    case '/complete':
      return todos.filter(todo => todo.isComplete)
    default:
      return todos
  }
}
