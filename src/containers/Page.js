import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

export default class Page extends Component {
  getColumnWidths = () => {
    const {width} = this.props;

    // The default width is full size on small screens and below
    // and centered at 2/3 of the screen above that
    if (!width) {
      return {
        sm: 12,
        md: 10,
        mdOffset: 1,
        lg: 10,
        lgOffset: 1
      };
    }

    if (width === 'full') {
      return {xs: 12};
    }

    return width;
  };

  render() {
    const {
      children,
      width
    } = this.props;

    return (
      <Grid fluid={width === 'full'}>
        <Row>
          <Col {...this.getColumnWidths()}>
            {children}
          </Col>
        </Row>
      </Grid>
    );
  }
}
