import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PageHeader, Glyphicon} from 'react-bootstrap';

import Page from 'co/Page';
import Loading from 'co/Loading';
import Error from 'co/Error';
import * as storyActions from 'a/stories';
import Story from 'c/Story';
import CopyUrl from 'c/CopyUrl';

const mapStateToProps = (state, props) => {
  const {id} = props.params;
  const story = state.stories[id];

  return {
    id,
    story,
    me: state.me,
    error: story && story.error,
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
    const {story, syncing, error, me} = this.props;

    if (!story || syncing) {
      return <Loading />;
    }

    if (error) {
      return <Error error={error} />;
    }

    return (
      <Page>
        <PageHeader>
          {story.name}
          {story.type &&
            <small>{' '}<Glyphicon glyph={story.type === 'public' ? 'globe' : 'lock'} /></small>
          }
          {' '}
          <CopyUrl />
        </PageHeader>
        <Story story={story} me={me} onSubmit={this.handleSubmit} />
      </Page>
    );
  }
}
