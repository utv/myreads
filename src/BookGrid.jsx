import React from 'react'
import PropTypes from 'prop-types'

class BookGrid extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  handleShelfChanger = (moveToShelf) => {
    console.log(moveToShelf)
  }

  render() {
    const { books } = this.props
    const shelves = [
      { id: "moveTo", title: "Move to..." },
      { id: "wantToRead", title: "Want to Read" },
      { id: "currentlyReading", title: "Currently Reading" },
      { id: "read", title: "Want to Read" },
      { id: "none", title: "None" }
    ]

    return (
      <ol className="books-grid">
        {books.map(book => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                  }}
                >
                </div>
                <div className="book-shelf-changer">
                  <select
                    onChange={(e) => this.handleShelfChanger(e.target.value)}
                    value={book.shelf}
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
              {book.authors.map(author => (
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