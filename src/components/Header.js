import React, {Component} from 'react';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, MenuItem, NavDropdown} from 'react-bootstrap';

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
              one {BRANDS[this.state.brand]} at a time
            </Link>
          </NavbarBrand>
          <NavbarToggle />
        </NavbarHeader>
        <NavbarCollapse>
          <Nav pullRight>
            <LinkContainer to='/stories'>
              <MenuItem>Stories</MenuItem>
            </LinkContainer>
            <NavDropdown title='Start' id='start-nav'>
              <LinkContainer to='/create/private'>
                <MenuItem>Private</MenuItem>
              </LinkContainer>
              <LinkContainer to='/create/public'>
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
