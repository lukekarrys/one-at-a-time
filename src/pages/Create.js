import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Page from 'co/Page';
import * as storyActions from 'a/stories';

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = (dispatch) => ({
  storyActions: bindActionCreators(storyActions, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Create extends Component {
  componentDidMount() {
    this.props.storyActions.create();
  }

  render() {
    return (
      <Page>
        <h1>Creating story...</h1>
      </Page>
    );
  }
}
