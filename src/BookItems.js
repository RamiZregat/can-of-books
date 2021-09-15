import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BestBooks.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class BookItem extends React.Component {
  render() {
    return (
      <>
      <Col>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Book Name: {this.props.item.title}</Card.Title>
            <Card.Text>Description: {this.props.item.description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Status: {this.props.item.status}</ListGroupItem>
            <ListGroupItem><Button onClick={()=>this.props.deleteBook(this.props.item._id)}>Delete</Button></ListGroupItem>
            <ListGroupItem><Button onClick={()=>{this.props.handleOpen(this.props.item)}}>Update</Button></ListGroupItem>
          </ListGroup>
        </Card>
        </Col>
      </>
    );
  }
}
export default BookItem;
