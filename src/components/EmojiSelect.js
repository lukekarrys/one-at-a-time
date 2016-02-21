import React, {Component} from 'react';

import Emoji, {names} from 'c/Emoji';
import StoryItemSelect from './StoryItemSelect';

export default class EmojiSelect extends Component {
  emojiOption = (option) => <Emoji {...option} />;

  render() {
    return (
      <StoryItemSelect
        placeholder='Type to find an emoji!'
        labelKey='emoji'
        valueKey='emoji'
        options={names}
        optionRenderer={this.emojiOption}
        filter={this.filter}
        className='select--emoji'
        {...this.props}
      />
    );
  }
}

