import React, {Component} from 'react';
import {PageHeader} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import Page from 'co/Page';

export default class FourOhFourPage extends Component {
  render() {
    return (
      <Page>
        <PageHeader>Page Not Found</PageHeader>
        <p>Head back over to the <Link to='/'>home page</Link> probably.</p>
      </Page>
    );
  }
}
