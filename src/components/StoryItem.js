import React, {Component} from 'react';
import {Label, Tooltip, OverlayTrigger} from 'react-bootstrap';

import Emoji from 'c/Emoji';

export default class StoryItem extends Component {
  render() {
    const {data, type, user} = this.props;
    const classes = `story--item story--item--${type}`;

    let content;

    if (type === 'emoji') {
      content = <Emoji className={classes} emoji={data} />;
    }
    else {
      content = <Label className={classes}>{data}</Label>;
    }

    return (
      <OverlayTrigger placement='bottom' overlay={<Tooltip id='story-item-user'>{user.username}</Tooltip>}>
        {content}
      </OverlayTrigger>
    );
  }
}
