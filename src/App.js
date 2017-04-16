import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import ErrorMessage from './components/ErrorMessage'
import Footer from './components/Footer'
import Todo, {
  addTodo,
  createTodo,
  findById,
  toggleTodo,
  updateTodo,
  removeTodo,
  filterTodosForRoute
} from './server/todoService'

export default class App extends Component {
  static contextTypes = {
    route: React.PropTypes.string
  }

  state = {
    todos: [],
    currentTodo: '',
    errorMessage: ''
  }

  componentDidMount () {
    Todo.all().then(todos => this.setState({ todos }))
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
    const newTodo = createTodo({ name: currentTodo })

    this.setState({
      todos: addTodo(todos, newTodo),
      currentTodo: '',
      errorMessage: ''
    })

    Todo.create(newTodo)
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
