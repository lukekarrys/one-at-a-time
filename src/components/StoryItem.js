import React, {Component} from 'react';
import {Label} from 'react-bootstrap';

export default class StoryItem extends Component {
  render() {
    const {data, type} = this.props;

    const classes = `story--item story--item--${type}`;

    return (
      <Label className={classes}>{data}</Label>
    );
  }
}
