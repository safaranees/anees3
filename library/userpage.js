import React, { Component } from 'react'
import { Table,Nav} from 'react-bootstrap';
import {FaHome,FaBookReader,FaBookOpen,FaBook,FaSignOutAlt,FaSearch,FaSignInAlt,FaUserPlus,FaAddressBook} from 'react-icons/fa'




class UserPage extends Component {

    constructor(props) {
        super(props)

        this.state = {

            bookDetails: [],
            searchedBooks: []


        }
    }

    componentDidMount() {
        fetch("http://localhost:3005/books").then(
            res => {
                res.json()
                    .then(endRes => this.setState({ bookDetails: endRes, searchedBooks: endRes })).catch(err => console.log(err))
            })
            .catch(err => console.log(err))


    }
    
    handleClick = (p, user) => {

        let temp = {
            ...p,
            available_copies: p.available_copies - 1,
            issued_to: [...p.issued_to, user.username]
        }
        fetch("http://localhost:3005/books/" + p.id, {
            method: 'PUT',
            body: JSON.stringify(temp),
            headers: {
                'content-type': 'application/json'
            }
        }
        ).then(result => result.json().then(data => console.log(data))).catch(err => console.log(err))
        this.props.history.push("/userbooks");

    }

    handleChange = (event) => {
        let x = document.getElementById("select").value;

        let search = event.target.value;
        if (search !== undefined) {
            console.log("select value", x);
            if (x === "title") {
                this.setState(state => state.searchedBooks = this.state.bookDetails.filter(p => p.title.toLowerCase().includes(search.toLowerCase())))
            }
            else if (x === "author") {
                this.setState(state => state.searchedBooks = this.state.bookDetails.filter(p => p.author.toLowerCase().includes(search.toLowerCase())))
            }
            else if (x === "genre") {
                this.setState(state => state.searchedBooks = this.state.bookDetails.filter(p => p.genre.toLowerCase().includes(search.toLowerCase())))
            }
        } else {
            this.setState(state => state.searchedBooks = this.state.bookDetails)
        }


    }

    render() {


        const { bookDetails } = this.state.bookDetails;;



        let user = JSON.parse(localStorage.getItem("authenticted_user"));
        console.log(user.username)

        console.log("bookDetails", bookDetails);

        return (
            <div>
                <Nav className="justify-content-end navbar navbar-dark bg-dark" activeKey="/home">

                    <h3 className="logo-icon"><FaBookOpen/>&nbsp;</h3><h3 className="navheader">E-Library</h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Nav.Item>
                        <Nav.Link href="/userbooks" ><FaBook/>&nbsp;MyBooks</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/contact" ><FaAddressBook/>&nbsp;Contact Us</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/logout" ><FaSignOutAlt/>&nbsp;Logout</Nav.Link>
                    </Nav.Item>
                    
                </Nav>
                <h3 className="centered">Welcome {user.username}</h3>
                <div className="tablediv">
                    
                    <div className="search">

                        <select id="select" >
                            <option value="title" >Title</option>
                            <option value="author" >Author</option>
                            <option value="genre">Genre</option>
                        </select>

                        <input type="text" placeholder="Search Books..." name="search" onChange={this.handleChange} />
                        


                    </div>
                    <br />
                    <br />
                    <Table className="table" striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Status</th>
                            </tr>
                        </thead>


                        <tbody>
                            {this.state.searchedBooks.map(p => p.available_copies > 0 ? <tr>
                                <td>{p.id}</td>
                                <td>{p.title}</td>
                                <td>{p.author}</td>
                                <td>{p.genre}</td>
                                {p.issued_to.includes(user.username)?<td><h6 style={{color:"turquoise"}}>You already bought it</h6></td>:
                            <td><button className="btn btn-success" onClick={() => this.handleClick(p, user)}>Check-Out</button></td>}
                            </tr>
                                : <tr>
                                    <td>{p.id}</td>
                                    <td>{p.title}</td>
                                    <td>{p.author}</td>
                                    <td>{p.genre}</td>
                                    <td><button className="btn btn-danger disabled" >Out-Of-Stock</button></td>
                                </tr>)}




                        </tbody>

                    </Table>
                </div>
            </div>
        )
    }
}


export default UserPage
