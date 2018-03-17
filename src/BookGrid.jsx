import React from 'react'
import PropTypes from 'prop-types'


class BookGrid extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  handleShelfChanger = (book, event) => {
    this.props.onUpdateBook(book, event.target.value)
  }

  render() {
    const { books, shelves } = this.props
    /* const shelves = [
      { id: "moveTo", title: "Move to..." },
      { id: "wantToRead", title: "Want to Read" },
      { id: "currentlyReading", title: "Currently Reading" },
      { id: "read", title: "Want to Read" },
      { id: "none", title: "None" }
    ] */

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
                    onChange={this.handleShelfChanger.bind(this, book)}
                    value={book.shelf ? book.shelf : 'none'}
                  >
                    {shelves.map((shelf, index) => (
                      <option
                        key={shelf.id}
                        value={shelf.id}
                        disabled={index === 0 ? true : false}
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