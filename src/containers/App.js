import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Header from 'c/Header';
import Footer from 'c/Footer';
import * as meActionCreators from 'a/me';

const mapStateToProps = ({me}, props) => ({
  me,
  ...props
});

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
          onLogin={meActions.login}
          onLogout={meActions.logout}
        />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
