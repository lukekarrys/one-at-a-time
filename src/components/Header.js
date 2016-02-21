import React, {Component} from 'react';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, MenuItem, NavDropdown} from 'react-bootstrap';

import Logo from './Logo';

const {
  Header: NavbarHeader,
  Brand: NavbarBrand,
  Toggle: NavbarToggle,
  Collapse: NavbarCollapse
} = Navbar;

export default class Header extends Component {
  handleLoginTwitter = (e) => {
    e.preventDefault();
    this.props.onLogin({type: 'twitter'});
  };

  handleLogoutAnonymous = (e) => {
    e.preventDefault();
    this.props.onLogin();
  };

  handleLogout = (e) => {
    e.preventDefault();
    this.props.onLogout();
  };

  renderLoginDropdown() {
    const {me} = this.props;

    if (me.token) {
      const user = (
        <span>
          {me.username}
          {me.avatar && <img src={me.avatar} />}
        </span>
      );
      return (
        <NavDropdown title={user} id='me-nav'>
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
            <Link to='/' onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseOut}>
              <Logo onHover cycle />
            </Link>
          </NavbarBrand>
          <NavbarToggle />
        </NavbarHeader>
        <NavbarCollapse>
          <Nav pullRight>
            <LinkContainer onlyActiveOnIndex to='/stories'>
              <MenuItem>Stories</MenuItem>
            </LinkContainer>
            <NavDropdown title='Start' id='start-nav'>
              <LinkContainer to='/start/private'>
                <MenuItem>Private</MenuItem>
              </LinkContainer>
              <LinkContainer to='/start/public'>
                <MenuItem>Public</MenuItem>
              </LinkContainer>
            </NavDropdown>
            {this.renderLoginDropdown()}
          </Nav>
        </NavbarCollapse>
      </Navbar>
    );
  }
}
