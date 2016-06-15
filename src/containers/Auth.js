import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

export default (Page) => {
  class AuthenticatedComponent extends Component {
    componentWillMount() {
      this.checkAuth(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps);
    }

    checkAuth(props) {
      if (!props.uid) {
        browserHistory.replace({
          pathname: 'login',
          query: {
            redirect: props.location.pathname
          }
        });
      }
    }

    render() {
      const {uid} = this.props;

      if (!uid) {
        return (<div />);
      }

      return (
        <div>
          {Page ? <Page {...this.props} /> : this.props.children}
        </div>
      );
    }
  }

  return connect(({me}) => ({
    uid: me.uid
  }))(AuthenticatedComponent);
};
