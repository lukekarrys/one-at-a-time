import React, {Component} from 'react';
import emoji from 'emojione';

export const names = Object.keys(emoji.emojioneList)
  .map((name) => ({emoji: name.slice(1).slice(0, -1)}));

export default class Emoji extends Component {
  render() {
    return (
      <span
        title={this.props.emoji}
        dangerouslySetInnerHTML={{
          __html: emoji.toImage(`:${this.props.emoji}:`)
        }}
      />
    );
  }
}
