import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Jumbotron, Label} from 'react-bootstrap';

import Logo from 'c/Logo';
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
export default class HomePage extends Component {
  render() {
    return (
      <Page>
        <Jumbotron>
          <h1 className='text-center'>
            <Logo interval={1500} />
          </h1>
          <p className='text-success'>
            As the saying goes, an <Label bsStyle='success'>emoji</Label> is worth a million words and a <Label bsStyle='success'>gif</Label> of your wonderful face is worth 10 million.
          </p>
          <p className='text-success'>
            Collaborate with friends to create stories from <Label bsStyle='success'>emoji</Label>, webcam <Label bsStyle='success'>gifs</Label>, and even regular old <Label bsStyle='success'>words*</Label>.
          </p>
          <small>*words are still just worth one word, but no one is really keeping score</small>
        </Jumbotron>
        <Nav bsStyle='pills' stacked>
          <LinkContainer to='/start/private'>
            <NavItem>
              <strong>Start a Private Story</strong>
              <br />
              <small>(people will need the url to join)</small>
            </NavItem>
          </LinkContainer>
          <LinkContainer to='/start/public'>
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
