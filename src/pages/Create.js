import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Page from 'co/Page';
import * as storyActions from 'a/stories';

const mapStateToProps = (state, props) => ({
  type: ['public', 'private'].indexOf(props.route.path) === -1 ? 'private' : props.route.path
});

const mapDispatchToProps = (dispatch) => ({
  storyActions: bindActionCreators(storyActions, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Create extends Component {
  componentDidMount() {
    const {type} = this.props;
    this.props.storyActions.create(type);
  }

  render() {
    return (
      <Page>
        <h1>Creating story...</h1>
      </Page>
    );
  }
}
