import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PageHeader} from 'react-bootstrap';

import Page from 'co/Page';
import * as storiesListActions from 'a/storiesList';
import Stories from 'c/Stories';

const mapStateToProps = (state, props) => {
  const stories = state.storiesList.records;
  return {stories};
};

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
    const {stories} = this.props;

    return (
      <Page>
        <PageHeader>Choose a Story to Join</PageHeader>
        <Stories stories={stories} />
      </Page>
    );
  }
}
