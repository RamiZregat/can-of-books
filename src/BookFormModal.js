import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class BookFormModal extends React.Component {
  render() {
    return (

        <Modal.Dialog>
  <Modal.Header closeButton>
    <Modal.Title>New Book</Modal.Title>
  </Modal.Header>

      <form onSubmit={this.props.addBook}>
      <fieldset>
  <Modal.Body>
        <label for="name">Book Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your name.."
        />

        <label for="des">Description:</label>
        <input
          type="text"
          id="des"
          name="des"
          placeholder="Your last name.."
        />

        <label for="status">Status:</label>
  </Modal.Body>
        <select id="status" name="status">
          <option value="On stock">On stock</option>
          <option value="Out of stock">Out of stock</option>
          
        </select>
  <Modal.Footer>

        <input type="submit" value="Add" />
        
  </Modal.Footer>
  </fieldset>
      </form>

</Modal.Dialog>


    );
  }
}
export default BookFormModal;
