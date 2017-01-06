import React, {Component} from 'react';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavItem, NavDropdown} from 'react-bootstrap';

import Logo from './Logo';

const NavbarHeader = Navbar.Header;
const NavbarBrand = Navbar.Brand;
const NavbarToggle = Navbar.Toggle;
const NavbarCollapse = Navbar.Collapse;

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

    if (me.uid) {
      const user = (
        <span>
          {me.username}
          {me.avatar && <img src={me.avatar} />}
        </span>
      );
      return (
        <NavDropdown title={user} id='me-nav'>
          <LinkContainer to='/stories/mine'>
            <NavItem>Stories</NavItem>
          </LinkContainer>
          <NavItem divider />
          <NavItem onClick={this.handleLogout}>Logout</NavItem>
        </NavDropdown>
      );
    }

    return (
      <NavDropdown title='Login' id='login-nav'>
        <NavItem onClick={this.handleLoginTwitter}>Login with Twitter</NavItem>
        <NavItem onClick={this.handleLogoutAnonymous}>Login Anonymously</NavItem>
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
              <NavItem>Stories</NavItem>
            </LinkContainer>
            <NavDropdown title='Start' id='start-nav'>
              <LinkContainer to='/start/private'>
                <NavItem>Private</NavItem>
              </LinkContainer>
              <LinkContainer to='/start/public'>
                <NavItem>Public</NavItem>
              </LinkContainer>
            </NavDropdown>
            {this.renderLoginDropdown()}
          </Nav>
        </NavbarCollapse>
      </Navbar>
    );
  }
}
