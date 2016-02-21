import React, {Component} from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

import Emoji from 'c/Emoji';

export default class StoryItem extends Component {
  render() {
    const {data, type, user} = this.props;
    const classes = `story--item story--item--${type}`;

    let content;

    if (type === 'emoji') {
      content = <Emoji className={classes} emoji={data} />;
    }
    else if (type === 'gif') {
      content = <img className={classes} src={data} />;
    }
    else {
      content = <span className={classes}>{data}</span>;
    }

    return (
      <OverlayTrigger placement='bottom' overlay={<Tooltip id='story-item-user'>{user.username}</Tooltip>}>
        {content}
      </OverlayTrigger>
    );
  }
}
