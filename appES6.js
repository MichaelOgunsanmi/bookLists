// UI Variables

const submitBtn = document.querySelector('#btn')
const bookList = document.querySelector('#book-list')


class Book {
  constructor(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}

class UIEvents {
  addBookToList(book) {
    const bookList = document.querySelector('#book-list')
    const row = document.createElement('tr')
    row.innerHTML =
      `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href = "#" class= "delete">x</a></td>`
    bookList.appendChild(row)
  }

  clearFields() {
    document.querySelector('#title').value = ''
    document.querySelector('#author').value = ''
    document.querySelector('#isbn').value = ''
  }

  showAlert(message, classType) {
    const div = document.createElement('div')
    div.className = `alert ${classType}`
    div.appendChild(document.createTextNode(message))

    const container = document.querySelector('.container')
    const form = document.querySelector('#book-form')
    container.insertBefore(div, form)
    setTimeout(function () {
      document.querySelector('.alert').remove()
    }, 1500)
  }

  deleteUIBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove()
    }
  }
}

class Store {
  static getBooks(){
    let books
    if (localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books
  }

  static displayBooks(){
    const books = Store.getBooks()
    books.forEach(book => {
      const ui = new UIEvents
      ui.addBookToList(book) 
    });
  }

  static addBook(book){
    const books = Store.getBooks()
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(isbn){
    const books = Store.getBooks()
    books.forEach((book,index) => {
      if (book.isbn === isbn) {
        books.splice(index,1)
      }
    });
    localStorage.setItem('books', JSON.stringify(books))
  }

}

loadEventListeners()

function loadEventListeners() {
  submitBtn.addEventListener('click', submitForm)
  bookList.addEventListener('click', deleteBook)
  document.addEventListener('DOMContentLoaded', Store.displayBooks)
}

function submitForm(e) {
  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const isbn = document.querySelector('#isbn').value

  const book = new Book(title, author, isbn)
  const ui = new UIEvents()
  if (title === '' || author === '' || isbn === '') {
    ui.clearFields()
    ui.showAlert('Please fill in all fields', 'error')
  } else {
    ui.addBookToList(book)
    Store.addBook(book)
    ui.showAlert('Book Added', 'success')
    ui.clearFields()
  }

  e.preventDefault()
}

function deleteBook(e) {
  const ui = new UIEvents()
  ui.deleteUIBook(e.target)
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
  ui.showAlert('Book removed', 'success')
  e.preventDefault()
}