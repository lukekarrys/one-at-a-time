import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {PageHeader} from 'react-bootstrap';

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
        <PageHeader>Start or Join a Story!</PageHeader>
        <Nav bsStyle='pills' stacked>
          <LinkContainer to='/create/private'>
            <NavItem>
              <strong>Start a Private Story</strong>
              <br />
              <small>(people will need the url to join)</small>
            </NavItem>
          </LinkContainer>
          <LinkContainer to='/create/public'>
            <NavItem>
              <strong>Start a Public Story</strong>
              <br />
              <small>(anyone can join and the url will be listed on the stories page)</small>
            </NavItem>
          </LinkContainer>
          <LinkContainer to='/stories'>
            <NavItem><strong>Join a Public Story</strong></NavItem>
          </LinkContainer>
        </Nav>
      </Page>
    );
  }
}
