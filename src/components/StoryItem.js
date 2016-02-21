import React, {Component} from 'react';
import {Popover, OverlayTrigger} from 'react-bootstrap';

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

    const popover = (
      <Popover id='story-item-info'>
        <strong>User:</strong> {user.username}
        {type === 'emoji' &&
          <span><br /><strong>Emoji:</strong> {data}</span>
        }
      </Popover>
    );

    return (
      <OverlayTrigger placement='bottom' trigger='click' rootClose overlay={popover}>
        {content}
      </OverlayTrigger>
    );
  }
}
