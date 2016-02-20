import React, {Component} from 'react';
import {Label} from 'react-bootstrap';

import Emoji from 'c/Emoji';

export default class StoryItem extends Component {
  render() {
    const {data, type} = this.props;

    let content = data;
    const classes = `story--item story--item--${type}`;

    if (type === 'emoji') {
      content = <Emoji emoji={data} />;
    }

    return (
      <Label className={classes}>{content}</Label>
    );
  }
}
