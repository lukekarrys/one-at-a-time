import React, {Component} from 'react';
import {PageHeader, Button, ButtonToolbar, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Page from 'co/Page';
import * as meActionCreators from 'a/me';

const mapStateToProps = (state, props) => ({
  redirect: props.location.query.redirect || '/',
  authing: state.me.fetching
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

  handleLoginAnonymous = () => this.handleLogin();
  handleLoginTwitter = () => this.handleLogin('twitter');

  render() {
    const {authing} = this.props;
    return (
      <Page>
        <PageHeader>Login Required</PageHeader>
        <p>To do that thing you were trying to do, you must be logged in, either anonymously or with Twitter.</p>
        <p className='text-info'>The only difference is <strong>if you login anonyously, you won't have access to your list of private stories later.</strong></p>
        <br />
        {authing &&
          <Alert bsStyle='info'>
            Authenticating...
          </Alert>
        }
        {!authing &&
          <ButtonToolbar>
            <Button onClick={this.handleLoginAnonymous} bsStyle='primary'>Login Anonymously</Button>
            <Button onClick={this.handleLoginTwitter} bsStyle='primary'>Login with Twitter</Button>
          </ButtonToolbar>
        }
      </Page>
    );
  }
}
