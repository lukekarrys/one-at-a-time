import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as storyActions from 'a/stories';
import Story from 'c/Story';

const mapStateToProps = (state, props) => {
  const {stories} = state;
  const {id} = props.params;
  const story = stories[id];

  return {
    id,
    story
  };
};

const mapDispatchToProps = (dispatch) => ({
  storyActions: bindActionCreators(storyActions, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class StoryPage extends Component {
  componentDidMount() {
    const {id} = this.props;
    this.closeRef = this.props.storyActions.join(id);
  }

  componentWillUnmount() {
    this.closeRef();
  }

  handleSubmit = (item) => {
    const {id} = this.props;
    this.props.storyActions.add({id, item});
  };

  render() {
    const {story} = this.props;

    return (
      <div>
        <h1>Story</h1>
        <Story story={story} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
