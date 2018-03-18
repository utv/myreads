import React from 'react'
import PropTypes from 'prop-types'


class BookGrid extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onBookUpdated: PropTypes.func.isRequired
  }

  handleShelfChanger = (book, shelf) => {
    this.props.onBookUpdated(book, shelf)
  }

  render() {
    const { books, shelves } = this.props
    return (
      <ol className="books-grid">
        {books.map(book => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                {book.imageLinks &&
                  <div className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks.thumbnail})`
                    }}
                  >
                  </div>}
                <div className="book-shelf-changer">
                  <select
                    onChange={e => this.handleShelfChanger(book, e.target.value)}
                    value={book.shelf ? book.shelf : 'none'}
                  >
                    {shelves.map((shelf, index) => (
                      <option
                        key={shelf.id}
                        value={shelf.id}
                        disabled={index === 0}
                      >
                        {shelf.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              {book.authors && book.authors.map(author => (
                <div key={author} className="book-authors">{author}</div>
              ))}
            </div>
          </li>
        ))}
      </ol>
    )
  }
}

export default BookGrid