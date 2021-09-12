import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends Component {
  render() {
    const { user,isAuthenticated } = this.props.auth0;
    return (
      <>
    {isAuthenticated && <div>Name: {user.name}</div>}
    {isAuthenticated && <div>Email: {user.email}</div>}
    {!isAuthenticated && <div>There is no user data stored</div>}
    </> 
    );
  }
}

export default withAuth0(Profile);