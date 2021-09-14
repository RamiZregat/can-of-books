import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import './Header.css';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

class Header extends React.Component {
  render() {
    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <div className={"navItems"}>
        <Navbar.Brand >My Favorite Books</Navbar.Brand>
        <Link to="/" >Home</Link>
        <Link to="/profile" >Profile</Link>
        <LogoutButton />
        <LoginButton />
        </div>
      </Navbar>
    );
  }
}

export default Header;
