import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PageHeader} from 'react-bootstrap';

import Page from 'co/Page';
import Loading from 'co/Loading';
import * as storyActions from 'a/stories';
import Story from 'c/Story';
import CopyUrl from 'c/CopyUrl';

const mapStateToProps = (state, props) => {
  const {id} = props.params;
  const story = state.stories[id];

  return {
    id,
    story,
    syncing: story && (story.fetching || story.joining)
  };
};

const mapDispatchToProps = (dispatch) => ({
  storyActions: bindActionCreators(storyActions, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class StoryPage extends Component {
  componentDidMount() {
    const {id} = this.props;
    this.joinRef = this.props.storyActions.join(id);
    this.fetchRef = this.props.storyActions.fetch(id);
  }

  componentWillUnmount() {
    this.joinRef();
    this.fetchRef();
  }

  handleSubmit = (item) => {
    const {id} = this.props;
    this.props.storyActions.add({id, item});
  };

  render() {
    const {story, syncing} = this.props;

    if (!story || syncing) {
      return <Loading />;
    }

    return (
      <Page>
        <PageHeader>{story.name} <CopyUrl /></PageHeader>
        <Story story={story} onSubmit={this.handleSubmit} />
      </Page>
    );
  }
}
