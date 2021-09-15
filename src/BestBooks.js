import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BestBooks.css";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import BookItem from "./BookItems";
import BookFormModal from './BookFormModal'
import Row from "react-bootstrap/Row";
import UpdateForm from './UpdateForm'
import Button from "react-bootstrap/Button";


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BookArray: [],
      showModel:false,
      showFlag:false,
      title:'',
      description:'',
      status:'',
      id:''
    };

 
  }
  
  componentDidMount = () => {
    const { user } = this.props.auth0;
    const email = user.email;
    const URL = `https://rami-can-of-books.herokuapp.com/books?email=${email}`;
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
    event.preventDefault();
    const { user } = this.props.auth0;
    const email = user.email;
    const obj={
      title: event.target.name.value,
      description: event.target.des.value,
      status: event.target.status.value,
      email:email
    }
    await axios
    .post('https://rami-can-of-books.herokuapp.com/addbooks',obj)
    .then(result=>{
      this.setState({
        BookArray:result.data,
        showModel:false,

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
    .delete(`https://rami-can-of-books.herokuapp.com/deletebooks/${id}?email=${email}`)
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

  updateBook=async(event)=>{
    event.preventDefault();
    const{user}=this.props.auth0;
    const email=user.email;
    const obj={
      title:event.target.title.value,
      description:event.target.description.value,
      status:event.target.status.value,
      email:email,
    }
    await axios
    .put(`https://rami-can-of-books.herokuapp.com/updatebooks/${this.state.id}`,obj)
    .then(result=>{
      this.setState({
        BookArray:result.data,
        showFlag:false
      })
    })
    .catch(err=>{
      console.log("Error on updating");
    })
  }
  

  handleCloseModel=()=>{
      this.setState({
        showModel:false,
      })
  }
  handleOpenModel=()=>{
      this.setState({
        showModel:true,
      })
  }
  handleClose=()=>{
      this.setState({
        showFlag:false,
      })
  }
  handleOpen=(item)=>{
      this.setState({
        showFlag:true,
        title:item.title,
        description:item.description,
        status:item.status,
        id:item._id,
      })
  }

  render() {
    return (
      <>
        <div className={"textDiv"}>
          <h1>My Favorite Books</h1>
          <Button onClick={()=>this.handleOpenModel()}>Add Book</Button>
            {this.state.showModel && <BookFormModal handleCloseModel={this.handleCloseModel}  showModel={this.state.showModel} addBook={this.addBook}/> }
          <p>This is a collection of my favorite books</p>
        </div>
        <Row xs={1} md={3} className="g-4">
        {this.state.BookArray.map((item) => {
          return <BookItem  handleOpen={this.handleOpen} item={item} deleteBook={this.deleteBook} />;
        })}
        </Row>
        <UpdateForm
        show={this.state.showFlag}
        handleClose={this.handleClose}
        title={this.state.title}
        description={this.state.description}
        status={this.state.status}
        id={this.state.id}
        updateBook={this.updateBook}
        />
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
