import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BestBooks.css";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Carousel from "react-bootstrap/Carousel";
import { withAuth0 } from "@auth0/auth0-react";
class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BookArray: [],
    };
  }
  componentDidMount = () => {
    const {user}=this.props.auth0;
    const email=user.email;
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

  render() {
    return (
      <Jumbotron>
        <div class={"textDiv"}>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        </div>
        <Carousel fade>
          {this.state.BookArray.map((item) => {
            return (
              <Carousel.Item>
                <div class={'imgDiv'}>
                <img
                  src={item.posterURL}
                  alt="First slide"
                />
                </div>
                <Carousel.Caption>
                <div class={"textDiv"}>
                  <h3>Book Name: {item.title}</h3>
                  <p>
                  Description: {item.description}
                  </p>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Jumbotron>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
