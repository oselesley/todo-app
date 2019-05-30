'use strict'

const getTodos = (name) => {
  let todos = JSON.parse(localStorage.getItem(name))
  return (!todos) ? [] : todos
}

const saveTodos = (name, array) => {
  return localStorage.setItem(name, JSON.stringify(array))
}

const renderTodos = (todos) => {
  if (todos.length < 1) document.querySelector('.canvas').appendChild(emptyTodoMessage())
  else {
    let todoEl = document.querySelector('.canvas')
    let todosLeft = getTodosLeft(todos)
    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(todosLeft, todos))
    todos.forEach(todo => {
      todoEl.appendChild(generateTodoDOM(todo, todos))
    })
  }
}

const emptyTodoMessage = () => {
  let emptyEl = document.createElement('p')
  emptyEl.classList.add('list-item', 'empty-element')
  emptyEl.textContent = "you have no Todo's"
  return emptyEl
}

const removeTodos = (todoID, todos) => {
  todos.splice(todos.findIndex(todo => todo.id === todoID), 1)
  saveTodos('todos', todos)
}

const updateTodos = (todoID, todos) => {
  let index = todos.findIndex(todo => todoID === todo.id)
  if (index > -1) {
    todos[index].completed = !todos[index].completed
    saveTodos('todos', todos)
  }
}

const generateSummaryDOM = (todosLeft, todos) => {
  let summaryElement = document.createElement('h3')
  summaryElement.classList.add('list-title')
  let todosText = todosLeft === 1 ? 'todo' : 'todos'
  summaryElement.textContent = `You have ${todosLeft} ${todosText} left`
  return summaryElement
}
const generateTodoDOM = (todo, todos) => {
  let newTodo = document.createElement('label')
  let containerTodo = document.createElement('div')
  let todoText = document.createElement('span')
  let deleteTodo = document.createElement('button')
  let updateTodoStatus = document.createElement('input')

  updateTodoStatus.setAttribute('type', 'checkbox')
  // Make sure the checkbox is checked or unchecked depending on the todo status
  updateTodoStatus.checked = todo.completed
  updateTodoStatus.addEventListener('change', e => {
    updateTodos(todo.id, todos)
    renderTodos(todos)
  })
  containerTodo.appendChild(updateTodoStatus)

  todoText.textContent = todo.name
  todoText.classList.add('todo-text')
  containerTodo.appendChild(todoText)

  deleteTodo.textContent = 'remove'
  deleteTodo.classList.add('button', 'button--text')
  deleteTodo.addEventListener('click', function (e) {
    removeTodos(todo.id, todos)
    renderTodos(todos)
  })

  containerTodo.classList.add('list-item__container')
  newTodo.classList.add('list-item')
  newTodo.appendChild(containerTodo)
  newTodo.appendChild(deleteTodo)
  return newTodo
}

const getTodosLeft = (todos) => {
  return todos.filter(todo => !todo.completed).length
}

const filterTodos = (searchFilter, array) => {
  return array.filter(item => item.name.toLowerCase().includes(searchFilter.name.toLowerCase()))
    .filter(todo => searchFilter.hideCompleted ? !todo.completed : true)
}

const validateTodo = (title, todos) => {
  return !!todos.every(todo => todo.name !== title) && !/^\s*$/.test(title)
}

const renderErrorMessage = (msg) => {
  let errorElement = document.querySelector('small')
  errorElement.textContent = msg
}

const addNewTodo = (title) => {
  let msg
  let todos = getTodos('todos')
  if (validateTodo(title, todos)) {
    todos.push({ name: title, completed: false, id: uuidv4() })
    saveTodos('todos', todos)
    renderTodos(todos)
  } else if (/^\s*$/.test(title)) msg = 'Empty field!!'
  else msg = 'Todo Already Exists'
  renderErrorMessage(msg)
}
