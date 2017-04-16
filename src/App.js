import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import ErrorMessage from './components/ErrorMessage'
import Message from './components/Message'
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
    errorMessage: '',
    message: ''
  }

  componentDidMount () {
    Todo.all().then(todos => this.setState({ todos }))
  }

  render () {
    const { route } = this.context
    const { currentTodo, errorMessage, message, todos } = this.state

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
          <Message message={message} />
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

  setTemporaryMessage = message => {
    this.setState({ message })
    setTimeout(() => {
      this.setState({ message: ''})
    }, 2500)
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
      .then(() => this.setTemporaryMessage('Todo added'))
  }

  handleToggle = id => {
    const { todos } = this.state

    const toggledTodo = toggleTodo(findById(todos, id))

    this.setState({
      todos: updateTodo(todos, toggledTodo)
    })

    Todo.update(toggledTodo)
      .then(() => this.setTemporaryMessage('Todo updated'))
  }

  handleEmptySubmit = (event) => {
    event.preventDefault()

    this.setState({
      errorMessage: 'Please set a new todo name',
      message: ''
    })
  }

  handleRemove = (id, event) => {
    event.preventDefault()

    const { todos } = this.state

    this.setState({
      todos: removeTodo(todos, id)
    })

    Todo.destroy(id)
      .then(() => this.setTemporaryMessage('Todo removed'))
  }
}
