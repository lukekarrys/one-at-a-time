import React, {Component} from 'react';
import {emojioneList, toImage} from 'emojione';

export const names = Object.keys(emojioneList)
  .map((name) => ({emoji: name.slice(1).slice(0, -1)}));

export default class Emoji extends Component {
  render() {
    const {emoji, ...rest} = this.props;

    return (
      <span
        dangerouslySetInnerHTML={{
          __html: toImage(`:${emoji}:`)
        }}
        {...rest}
      />
    );
  }
}
