import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as storyActions from '../actions/story';

import Story from '../components/Story';

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
    const {state} = this.props;

    return (
      <div>
        <Story />
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    );
  }
}
