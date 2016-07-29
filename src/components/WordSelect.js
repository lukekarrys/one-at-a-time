import React, {Component} from 'react';

import words from 'l/words';
import StoryItemSelect from './StoryItemSelect';

export default class WordSelect extends Component {
  render() {
    return (
      <StoryItemSelect
        customAllowCreate
        placeholder='Type a word!'
        labelKey='word'
        valueKey='word'
        options={words}
        className='select--word'
        {...this.props}
      />
    );
  }
}
