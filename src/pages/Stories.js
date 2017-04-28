import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PageHeader} from 'react-bootstrap';

import Page from 'co/Page';
import Loading from 'co/Loading';
import * as storiesListActions from 'a/storiesList';
import Stories from 'c/Stories';

const mapStateToProps = ({storiesList}) => ({
  stories: storiesList.records,
  syncing: storiesList.fetching
});

const mapDispatchToProps = (dispatch) => ({
  storiesListActions: bindActionCreators(storiesListActions, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class StoriesPage extends Component {
  componentDidMount() {
    this.closeRef = this.props.storiesListActions.fetch();
  }

  componentWillUnmount() {
    this.closeRef();
  }

  render() {
    const {stories, syncing} = this.props;

    if (!stories || syncing) {
      return <Loading />;
    }

    return (
      <Page>
        <PageHeader>Choose a Public Story to Join</PageHeader>
        <Stories stories={stories} />
      </Page>
    );
  }
}
