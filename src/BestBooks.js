import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BestBooks.css";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import BookItem from "./BookItems";
import BookFormModal from './BookFormModal'
import Row from "react-bootstrap/Row";

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BookArray: [],
      showModel:false,
    };
  }
  componentDidMount = () => {
    const { user } = this.props.auth0;
    const email = user.email;
    const URL = `http://localhost:3010/books?email=${email}`;
    axios
      .get(URL)
      .then((result) => {
        console.log(result);
        this.setState({
          BookArray: result.data,
        });
        console.log(this.state.BookArray);
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  addBook= async(event)=>{
    // event.preventDefault();
    const { user } = this.props.auth0;
    const email = user.email;
    const obj={
      title: event.target.name.value,
      description: event.target.des.value,
      status: event.target.status.value,
      email:email
    }
    await axios
    .post('http://localhost:3010/addbooks',obj)
    .then(result=>{
      this.setState({
        BookArray:result.data
      })
      console.log(result.data);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  deleteBook= async(id)=>{
    const { user } = this.props.auth0;
    const email = user.email;
    await axios
    .delete(`http://localhost:3010/deletebooks/${id}?email=${email}`)
    .then(result=>{
      this.setState({
        BookArray:result.data
      })
      console.log(result.data);
    })
    .catch(err=>{
      console.log("Error on deleting");
    })
  }

  render() {
    return (
      <>
        <div className={"textDiv"}>
          <h1>My Favorite Books</h1>
          <button onClick={()=>{
            this.setState({
              showModel:true
            })}}>Add Book</button>
            {this.state.showModel && <BookFormModal showModel={this.state.showModel} addBook={this.addBook}/> }
          <p>This is a collection of my favorite books</p>
        </div>
        <Row xs={1} md={3} className="g-4">
        {this.state.BookArray.map((item) => {
          return <BookItem item={item} deleteBook={this.deleteBook} />;
        })}
        </Row>
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
