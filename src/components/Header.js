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

const BRANDS = [
  '_____',
  'word',
  'gif',
  'emoji',
  'face',
  'smile'
];

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {brand: 0};
  }

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

  handleMouseOver = () => {
    if (this.brandInterval) {
      clearInterval(this.brandInterval);
    }
    this.brandInterval = setInterval(() => {
      const current = this.state.brand;
      this.setState({brand: current === BRANDS.length - 1 ? 1 : current + 1});
    }, 500);
  }

  handleMouseOut = () => {
    if (this.brandInterval) {
      clearInterval(this.brandInterval);
      delete this.brandInterval;
    }
    this.setState({brand: 0});
  }

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
            <Link to='/' onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseOut}>
              one {BRANDS[this.state.brand]} at a time
            </Link>
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
