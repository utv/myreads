import React from 'react'
import PropTypes from 'prop-types'
import BookGrid from './BookGrid'

class Shelves extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  render() {
    const { books } = this.props
    const shelves = [
      { id: "moveTo", title: "Move to..." },
      { id: "wantToRead", title: "Want to Read" },
      { id: "currentlyReading", title: "Currently Reading" },
      { id: "read", title: "Read" },
      { id: "none", title: "None" }
    ]
    return (
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
                    onUpdateBook={this.props.onUpdateBook}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  }
}

export default Shelves