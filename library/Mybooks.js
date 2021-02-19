import React, { Component } from "react";
import UserNav from "./usernav";
class memberMyBooks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    };
  }
  componentDidUpdate() {
    fetch(
      "http://localhost:3001/books"
    )
      .then(result =>
        result.json().then(data =>
          this.setState({
            books: data
          })
        )
      )
      .catch(error => console.log(error));
  }

  componentDidMount() {
    fetch(
      "http://localhost:3001/books"
    )
      .then(result =>
        result.json().then(data =>
          this.setState({
            books: data
          })
        )
      )
      .catch(error => console.log(error));
  }

  click = (id, book, name) => {
    let link =
      "https://localhost:3001/books/" +
      id +
      ".json";
    let copies = book.no_copies;
    let issues = book.issued_to.filter(p => {
      return p !== name;
    });
    let new_book = {
      ...book,
      no_copies: copies + 1,
      issued_to: [...issues]
    };
    console.log(new_book);
    fetch(link, {
      method: "PUT",
      body: JSON.stringify(new_book),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(result => console.log(result.json().then(data => data)))
      .catch(error => console.log(error));
    this.props.history.push("/member-home");
  };

  render() {
    let user = JSON.parse(localStorage.getItem("authenticted_user"));
    let books = this.state.books;
    let rowdata = [];
    for (let i = 0; i < books.length - 1; i++) {
      if (books[i] !== null && books[i].issued_to.includes(user.name)) {
        rowdata.push(
          <tr key={books[i].id}>
            <td>{books[i].title}</td>
            <td>{books[i].author}</td>
            <td>{books[i].genere}</td>

            <td>
              <button
                className="btn btn-primary"
                onClick={() => this.click(books[i].id, books[i], user.name)}
              >
                Return
              </button>
            </td>
          </tr>
        );
      }
    }
    return (
      <div>
        <div className="row">
          <UserNav />
        </div>

        <div className="table_div_mybooks">
          <table className="table-primary table-hover book_table">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Genere</th>
              <th scope="col">Submit Book</th>
            </tr>

            {rowdata}
          </table>
        </div>
      </div>
    );
  }
}

export default memberMyBooks;
