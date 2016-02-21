import React, {Component} from 'react';
import {PageHeader, Alert} from 'react-bootstrap';

import Page from 'co/Page';

export default class Error extends Component {
  render() {
    const {error} = this.props;

    return (
      <Page>
        <PageHeader>Error</PageHeader>
        <Alert bsStyle='danger'>
          {error}
        </Alert>
      </Page>
    );
  }
}
