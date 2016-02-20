import React, {Component} from 'react';
import {PageHeader} from 'react-bootstrap';

import Page from 'co/Page';

export default class Loading extends Component {
  render() {
    return (
      <Page>
        <PageHeader>Loading...</PageHeader>
      </Page>
    );
  }
}
