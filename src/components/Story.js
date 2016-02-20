import React, {Component} from 'react';

import WordSelect from './WordSelect';
import EmojiSelect from './EmojiSelect';
import StoryItem from './StoryItem';

export default class Story extends Component {
  handleTextSelect = (value) => {
    if (value) {
      this.props.onSubmit({
        type: 'text',
        data: value
      });
    }
  };

  handleEmojiSelect = (value) => {
    if (value) {
      this.props.onSubmit({
        type: 'emoji',
        data: value
      });
    }
  }

  render() {
    const {story} = this.props;

    return (
      <div>
        <div className='story--items'>
          {story.data.map((item) => <StoryItem key={item.id} {...item} />)}
        </div>
        <WordSelect onChange={this.handleTextSelect} />
        <EmojiSelect onChange={this.handleEmojiSelect} />
      </div>
    );
  }
}
