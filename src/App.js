import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import BookGrid from './BookGrid'
import Search from './Search'
import * as Constants from './Constants'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  // if a book doesn't have shelf, add one
  assignToShelf = (books, bookToUpdate, newShelf) => {
    return books.map((book) => {
      if (book.id === bookToUpdate.id)
        book.shelf = newShelf
      return book
    })
  }

  // add shelf to a book and remove from a book list if shelf is 'none'
  addToShelf = (books, bookToUpdate, newShelf) => {
    const newBooks = books.find(book => book.id === bookToUpdate.id)
      ? books
      : books.concat(bookToUpdate)
    return this.assignToShelf(newBooks, bookToUpdate, newShelf)
      .filter(book => book.shelf !== 'none')
  }

  // update books on the server and UI
  updateBook = (bookToUpdate, newShelf) => {
    BooksAPI.update(bookToUpdate, newShelf).then(res =>
      this.setState((prevState) => ({
        books: this.addToShelf(prevState.books, bookToUpdate, newShelf)
      })))
  }

  searchBook = (query) => {
    if (query === '')
      this.setState({ searchedBooks: [] })
    else
      BooksAPI.search(query).then(searchedBooks => {
        if (searchedBooks.error)
          this.setState({ searchedBooks: [] })
        else
          this.setState({ searchedBooks: searchedBooks })
      })
  }

  render() {
    const { books, searchedBooks } = this.state
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {Constants.shelves.filter(shelf => shelf.id !== "none" && shelf.id !== "moveTo")
                  .map(shelf => (
                    <div key={shelf.id} className="bookshelf">
                      <h2 className="bookshelf-title">{shelf.title}</h2>
                      <div className="bookshelf-books">
                        <BookGrid
                          books={books.filter(book => book.shelf === shelf.id)}
                          shelves={Constants.shelves}
                          onBookUpdated={this.updateBook}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="open-search">
              <Link to='/search' />
            </div>
          </div>
        )} />
        <Route path='/search' render={() => (
          <Search
            searchResults={searchedBooks}
            books={books}
            shelves={Constants.shelves}
            onBookUpdated={this.updateBook}
            onQueryChange={this.searchBook}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
