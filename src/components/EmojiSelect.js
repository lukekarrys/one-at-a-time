import React, {Component} from 'react';
import {Async as Select} from 'react-select';
import {sampleSize} from 'lodash';

import Emoji, {names} from 'c/Emoji';

export default class EmojiSelect extends Component {
  loadOptions = (input, cb) => {
    if (!input) {
      cb(null, {options: sampleSize(names, 10)});
      return;
    }

    cb(null, {
      options: names.filter(({emoji}) => emoji.indexOf(input.toLowerCase()) > -1),
      complete: true
    });
  }

  render() {
    return (
      <Select
        simpleValue
        autoBlur
        placeholder='Type and scroll to select an emoji...'
        minimumInput={2}
        labelKey='emoji'
        valueKey='emoji'
        loadOptions={this.loadOptions}
        optionRenderer={(option) => <Emoji {...option} />}
        className='select--emoji story--select'
        {...this.props}
      />
    );
  }
}
