// UI Variables

const submitBtn = document.querySelector('#btn')
const bookList = document.querySelector('#book-list')

function Book(title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn

  
}

function UIEvents(){}

UIEvents.prototype.addBookToList = function (book) {
  const bookList = document.querySelector('#book-list')
  const row = document.createElement('tr')
  row.innerHTML = 
  `<td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a href = "#" class= "delete">x</a></td>`
  bookList.appendChild(row)
}

UIEvents.prototype.clearFields = function () {
  document.querySelector('#title').value = ''
  document.querySelector('#author').value = ''
  document.querySelector('#isbn').value = '' 
}

UIEvents.prototype.showAlert = function (message, classType) {
  const div = document.createElement('div')
  div.className = `alert ${classType}`
  div.appendChild(document.createTextNode(message))

  const container = document.querySelector('.container')
  const form = document.querySelector('#book-form')
  container.insertBefore(div, form)
  setTimeout(function() {document.querySelector('.alert').remove()}, 1500)
}

UIEvents.prototype.deleteUIBook = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove()
  }
}

loadEventListeners()

function loadEventListeners() {
  submitBtn.addEventListener('click', submitForm)
  bookList.addEventListener('click', deleteBook)
}

function submitForm(e) {
  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const isbn = document.querySelector('#isbn').value
  
  const book = new Book(title, author, isbn)
  const ui = new UIEvents()
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all fields', 'error')
  }else{
    ui.addBookToList(book)
    ui.showAlert('Book Added', 'success')
    ui.clearFields()
  }

  
  e.preventDefault()
}

function deleteBook(e) {
  const ui = new UIEvents()
  ui.deleteUIBook(e.target)
  ui.showAlert('Book removed', 'success')



  e.preventDefault()
}