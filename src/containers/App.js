import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Header from 'c/Header';
import Footer from 'c/Footer';
import * as meActionCreators from 'a/me';

const mapStateToProps = ({me}) => ({me});

const mapDispatchToProps = (dispatch) => ({
  meActions: bindActionCreators(meActionCreators, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  render() {
    const {me, meActions} = this.props;

    return (
      <div>
        <Header
          me={me}
          onLoginAnonymous={meActions.loginAnonymous}
          onLoginTwitter={meActions.loginTwitter}
          onLogout={meActions.logout}
        />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
