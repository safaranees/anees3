import React, { Component } from "react";
import UserNav from "./usernav";

class memberHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      filter: "",
      display: false
    };
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
    console.log(id);
    console.log(book);
    console.log(name);
    let copies = book.no_copies;
    let issues = book.issued_to;
    let link =
      "http://localhost:3001/books" +
      id +
      ".json";
    let new_book = {
      ...book,
      no_copies: copies - 1,
      issued_to: [...issues, name]
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
    this.props.history.push("/member-mybooks");
  };
  handleChange = event => {
    this.setState({ filter: event.target.value });
  };

  displaySearch = () => {
    this.setState({
      display: !this.state.display
    });
  };

  render() {
    let x = "🔍";
    let y = "🔎";
    let user = JSON.parse(localStorage.getItem("authenticted_user"));
    const filter = this.state.filter;
    const lowercasedFilter = filter.toLowerCase();
    let books = this.state.books;
    let rowdata = [];
    let cssClass = this.state.display ? "displaySearch" : "hideSearch";
    for (let i = 0; i < books.length - 1; i++) {
      if (document.getElementById("search").value === "tittle") {
        if (
          books[i] !== null &&
          books[i].title.toLowerCase().includes(lowercasedFilter)
        ) {
          if (
            books[i].no_copies > 0 &&
            books[i].issued_to.includes(user.name)
          ) {
            rowdata.push(
              <tr key={books[i].id}>
                <td>{books[i].title}</td>
                <td>{books[i].author}</td>
                <td>{books[i].genere}</td>
                <td>{books[i].rack}</td>
                <td>{books[i].no_copies}</td>
                <td>You already Issued it!</td>
              </tr>
            );
          } else if (books[i].no_copies > 0) {
            rowdata.push(
              <tr key={books[i].id}>
                <td>{books[i].title}</td>
                <td>{books[i].author}</td>
                <td>{books[i].genere}</td>
                <td>{books[i].rack}</td>
                <td>{books[i].no_copies}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.click(books[i].id, books[i], user.name)}
                  >
                    Issue
                  </button>
                </td>
              </tr>
            );
          } else {
            rowdata.push(
              <tr key={books[i].id}>
                <td>{books[i].title}</td>
                <td>{books[i].author}</td>
                <td>{books[i].genere}</td>
                <td>{books[i].rack}</td>
                <td>{books[i].no_copies}</td>
                <td style={{ color: "red" }}>Not Available</td>
              </tr>
            );
          }
        }
      }
      if (document.getElementById("search").value === "author") {
        if (books[i].author.toLowerCase().includes(lowercasedFilter)) {
          if (
            books[i].no_copies > 0 &&
            books[i].issued_to.includes(user.name)
          ) {
            rowdata.push(
              <tr key={books[i].id}>
                <td>{books[i].title}</td>
                <td>{books[i].author}</td>
                <td>{books[i].genere}</td>
                <td>{books[i].rack}</td>
                <td>{books[i].no_copies}</td>
                <td>You already Issued it!</td>
              </tr>
            );
          } else if (books[i].no_copies > 0) {
            rowdata.push(
              <tr key={books[i].id}>
                <td>{books[i].title}</td>
                <td>{books[i].author}</td>
                <td>{books[i].genere}</td>
                <td>{books[i].rack}</td>
                <td>{books[i].no_copies}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.click(books[i].id, books[i], user.name)}
                  >
                    Issue
                  </button>
                </td>
              </tr>
            );
          } else {
            rowdata.push(
              <tr key={books[i].id}>
                <td>{books[i].title}</td>
                <td>{books[i].author}</td>
                <td>{books[i].genere}</td>
                <td>{books[i].rack}</td>
                <td>{books[i].no_copies}</td>
                <td style={{ color: "red" }}>Not Available</td>
              </tr>
            );
          }
        }
      }
      if (document.getElementById("search").value === "genere") {
        if (books[i].genere.toLowerCase().includes(lowercasedFilter)) {
          if (
            books[i].no_copies > 0 &&
            books[i].issued_to.includes(user.name)
          ) {
            rowdata.push(
              <tr key={books[i].id}>
                <td>{books[i].title}</td>
                <td>{books[i].author}</td>
                <td>{books[i].genere}</td>
                <td>{books[i].rack}</td>
                <td>{books[i].no_copies}</td>
                <td>You already Issued it!</td>
              </tr>
            );
          } else if (books[i].no_copies > 0) {
            rowdata.push(
              <tr key={books[i].id}>
                <td>{books[i].title}</td>
                <td>{books[i].author}</td>
                <td>{books[i].genere}</td>
                <td>{books[i].rack}</td>
                <td>{books[i].no_copies}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.click(books[i].id, books[i], user.name)}
                  >
                    Issue
                  </button>
                </td>
              </tr>
            );
          } else {
            rowdata.push(
              <tr key={books[i].id}>
                <td>{books[i].title}</td>
                <td>{books[i].author}</td>
                <td>{books[i].genere}</td>
                <td>{books[i].rack}</td>
                <td>{books[i].no_copies}</td>
                <td style={{ color: "red" }}>Not Available</td>
              </tr>
            );
          }
        }
      }
    }

    return (
      <div>
        <div className="row">
          <UserNav />
        </div>
        <div className="jumbotron " id="welcome">
          <h1>Welcome {user.name}</h1>
        </div>
        <h6 onClick={this.displaySearch} className="search_heading">
          <mark>
            {y}Difficulty in finding..?? Click here to use our search!{x}
          </mark>
        </h6>
        <div className={cssClass}>
          <select name="books" className="form-control" id="search">
            <option value="tittle">Title</option>
            <option value="author">Author</option>
            <option value="genere">Genere</option>
          </select>
          <input
            value={filter}
            className="form-control"
            id="search_input"
            onChange={this.handleChange}
            placeholder="Enter your Query here..."
          />
        </div>
        <div className="table_div">
          <table className="table-primary table-hover book_table" id="table">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Genere</th>
              <th scope="col">Rack</th>
              <th scope="col">No of Copies Available</th>
              <th scope="col">Availability</th>
            </tr>

            {rowdata}
          </table>
        </div>
      </div>
    );
  }
}

export default memberHome;
