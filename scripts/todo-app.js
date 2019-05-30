'use strict'

// Please Do not make use of globals, too much
const todos = getTodos('todos')
const searchFilter = {
  name: '',
  hideCompleted: false
}

renderTodos(todos)

document.querySelector('#search-todos').addEventListener('input', function (e) {
  searchFilter.name = e.target.value
  let todos = getTodos('todos')
  console.log(`Todos in DataBase:`, todos)
  let filteredTodos = filterTodos(searchFilter, todos)
  console.log(`filteredTodos:`, filteredTodos)
  renderTodos(filteredTodos)
})

document.querySelector('#hide-completed').addEventListener('click', function (e) {
  searchFilter.hideCompleted = e.target.checked
  let todos = getTodos('todos')
  let filteredTodos = filterTodos(searchFilter, todos)
  renderTodos(filteredTodos)
})

document.querySelector('#add-todo').addEventListener('submit', function (e) {
  e.preventDefault()
  let addTodoObj = addNewTodo(e.target.elements.addTodo.value)
  e.target.elements.addTodo.value = ''
})
