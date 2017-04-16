const { floor, random} = Math

const BASE_URL = 'http://localhost:8080/todos'

export default {
  all() {
    return fetch(BASE_URL)
      .then(response => response.json())
  },

  create(todo) {
    return fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    }).then(response => response.json())
  },

  update(todo) {
    return fetch(`${BASE_URL}/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    }).then(response => response.json())
  },

  destroy(id) {
    return fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}

export const generateId = () => floor(random() * 10000000000)
export const addTodo = (currentList, newTodo) => currentList.concat(newTodo)
export const createTodo = ({ name }) => ({ id: generateId(), name, isComplete: false })
export const findById = (list, id) => list.find(todo => todo.id === id)
export const toggleTodo = todo => ({ ...todo, isComplete: !todo.isComplete })
export const updateTodo = (list, updatedTodo) => {
  const updatedIndex = list.findIndex(todo => todo.id === updatedTodo.id)

  return [
    ...list.slice(0, updatedIndex),
    updatedTodo,
    ...list.slice(updatedIndex + 1)
  ]
}
export const removeTodo = (list, id) => {
  const removedIndex = list.findIndex(todo => todo.id === id)

  return [
    ...list.slice(0, removedIndex),
    ...list.slice(removedIndex + 1)
  ]
}
export const filterTodosForRoute = (todos, route) => {
  switch (route) {
    case '/active':
      return todos.filter(todo => !todo.isComplete)
    case '/complete':
      return todos.filter(todo => todo.isComplete)
    default:
      return todos
  }
}
