import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import Page from 'co/Page';
import * as storyActions from 'a/stories';

const mapStateToProps = (state, props) => ({
  state,
  props
});

const mapDispatchToProps = (dispatch) => ({
  storyActions: bindActionCreators(storyActions, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component {
  render() {
    return (
      <Page>
        <h1>Start or Join a Story!</h1>
        <Nav bsStyle='pills' stacked>
          <LinkContainer to='/create'>
            <NavItem>Start a Story and Invite Friends</NavItem>
          </LinkContainer>
          <LinkContainer to='/create'>
            <NavItem>Start a Story That Anyone Can Join</NavItem>
          </LinkContainer>
          <LinkContainer to='/stories/join'>
            <NavItem>Join a Random Story</NavItem>
          </LinkContainer>
        </Nav>
      </Page>
    );
  }
}
