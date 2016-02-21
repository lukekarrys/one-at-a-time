import React, {Component} from 'react';
import {PageHeader, Button, ButtonToolbar} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Page from 'co/Page';
import * as meActionCreators from 'a/me';

const mapStateToProps = (state, props) => ({
  redirect: props.location.query.redirect || '/'
});

const mapDispatchToProps = (dispatch) => ({
  meActions: bindActionCreators(meActionCreators, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class LoginPage extends Component {
  handleLogin = (type) => {
    const {meActions, redirect} = this.props;
    meActions.login({type, redirect});
  };

  render() {
    return (
      <Page>
        <PageHeader>Login Required</PageHeader>
        <p>To do that thing you were trying to do, you must be logged in, either anonymously or with Twitter.</p>
        <p>There's no real difference for now, but at some point in the future there'll probably be a way to find stories you participated in but only if you were logged in via Twitter at the time.</p>
        <ButtonToolbar>
          <Button onClick={() => this.handleLogin()} bsStyle='primary'>Login Anonymously</Button>
          <Button onClick={() => this.handleLogin('twitter')} bsStyle='primary'>Login with Twitter</Button>
        </ButtonToolbar>
      </Page>
    );
  }
}
