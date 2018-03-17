import React from 'react'
import PropTypes from 'prop-types'
import BookGrid from './BookGrid'
import { Link } from 'react-router-dom'

class Search extends React.Component {
  static propTypes = {
    searchResults: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onBookUpdated: PropTypes.func.isRequired,
    onQueryChange: PropTypes.func.isRequired
  }

  render() {
    const { searchResults, books, shelves, onQueryChange, onBookUpdated } = this.props
    // if books in search result are also in books state, 
    // then add key 'shelf' to search result
    const renderedBooks = searchResults.map((searchResult) => {
      const match = books.filter((aBookOnShelf) => aBookOnShelf.id === searchResult.id)
      if (match.length)
        searchResult.shelf = match[0].shelf
      return searchResult
    })

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className='close-search'
            to='/'
            onClick={(e) => onQueryChange('')}
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              autoFocus
              placeholder="Search by title or author"
              onChange={(e) => onQueryChange(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BookGrid
            books={renderedBooks}
            shelves={shelves}
            onBookUpdated={onBookUpdated}
          />
        </div>
      </div>
    )
  }
}

export default Search