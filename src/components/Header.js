import React, {Component} from 'react';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, MenuItem, NavItem, NavDropdown} from 'react-bootstrap';

const {
  Header: NavbarHeader,
  Brand: NavbarBrand,
  Toggle: NavbarToggle,
  Collapse: NavbarCollapse
} = Navbar;

export default class Header extends Component {
  handleLoginTwitter = (e) => {
    e.preventDefault();
    this.props.onLoginTwitter();
  };

  handleLogoutAnonymous = (e) => {
    e.preventDefault();
    this.props.onLoginAnonymous();
  };

  handleLogout = (e) => {
    e.preventDefault();
    this.props.onLogout();
  };

  renderLoginDropdown() {
    const {me} = this.props;

    if (me.id) {
      return (
        <NavDropdown title={me.username} id='me-nav'>
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </NavDropdown>
      );
    }

    return (
      <NavDropdown title='Login' id='login-nav'>
        <MenuItem onClick={this.handleLoginTwitter}>Login with Twitter</MenuItem>
        <MenuItem onClick={this.handleLogoutAnonymous}>Login Anonymously</MenuItem>
      </NavDropdown>
    );
  }

  render() {
    return (
      <Navbar fluid>
        <NavbarHeader>
          <NavbarBrand>
            <Link to='/'>one_atatime</Link>
          </NavbarBrand>
          <NavbarToggle />
        </NavbarHeader>
        <NavbarCollapse>
          <Nav pullRight>
            <LinkContainer to='/create'>
              <NavItem>Create</NavItem>
            </LinkContainer>
            {this.renderLoginDropdown()}
          </Nav>
        </NavbarCollapse>
      </Navbar>
    );
  }
}
