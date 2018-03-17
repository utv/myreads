import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
// import Shelves from './Shelves'
import BookGrid from './BookGrid'

class BooksApp extends React.Component {
  state = {
    // query: '',
    books: [],
    searchedBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  assignToShelf = (books, bookToUpdate, newShelf) =>
    books.map((book) => {
      if (book.id === bookToUpdate.id)
        book.shelf = newShelf
      return book
    })

  addToShelf = (books, bookToUpdate, newShelf) => {
    const newBooks = books.find(book => book.id === bookToUpdate.id)
      ? books
      : books.concat(bookToUpdate)
    return this.assignToShelf(newBooks, bookToUpdate, newShelf)
      .filter(book => book.shelf !== 'none')
  }

  updateBook = (bookToUpdate, newShelf) => {
    BooksAPI.update(bookToUpdate, newShelf)
    this.setState((prevState) => ({
      books: this.addToShelf(prevState.books, bookToUpdate, newShelf)
    }))
  }

  // update both MyReads and Search pages
  updateSearchedBook = (bookToUpdate, newShelf) => {
    BooksAPI.update(bookToUpdate, newShelf)
    this.setState((prevState) => {
      return {
        books: this.addToShelf(prevState.books, bookToUpdate, newShelf),
        searchedBooks: this.assignToShelf(prevState.searchedBooks, bookToUpdate, newShelf)
      }
    })
  }

  clearSearchedBooks = () => this.setState({ searchedBooks: [] })

  searchBook(query) {
    // if books in search result are also in books state, 
    // then add key 'shelf' to search result
    if (!query)
      this.clearSearchedBooks()
    else
      BooksAPI.search(query).then(searchedBooks => {
        // console.log('query ', searchedBooks)
        if (searchedBooks.error)
          this.clearSearchedBooks()
        else
          this.setState((prevState) => ({
            searchedBooks: searchedBooks.map((searchResult) => {
              const match =
                prevState.books.filter((aBookOnShelf) => aBookOnShelf.id === searchResult.id)
              if (match.length)
                searchResult.shelf = match[0].shelf
              return searchResult
            })
          }))
      })
  }

  render() {
    const shelves = [
      { id: "moveTo", title: "Move to..." },
      { id: "wantToRead", title: "Want to Read" },
      { id: "currentlyReading", title: "Currently Reading" },
      { id: "read", title: "Read" },
      { id: "none", title: "None" }
    ]
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
                {shelves.filter(shelf => shelf.id !== "none" && shelf.id !== "moveTo")
                  .map(shelf => (
                    <div key={shelf.id} className="bookshelf">
                      <h2 className="bookshelf-title">{shelf.title}</h2>
                      <div className="bookshelf-books">
                        <BookGrid
                          books={books.filter(book => book.shelf === shelf.id)}
                          shelves={shelves}
                          onUpdateBook={this.updateBook}
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
          <div className="search-books">
            <div className="search-books-bar">
              <Link className='close-search' to='/' onClick={this.clearSearchedBooks}>Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text"
                  autoFocus
                  placeholder="Search by title or author"
                  // value={this.state.query}
                  onChange={(e) => this.searchBook(e.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <BookGrid
                books={searchedBooks}
                shelves={shelves}
                onUpdateBook={this.updateSearchedBook}
              />
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
