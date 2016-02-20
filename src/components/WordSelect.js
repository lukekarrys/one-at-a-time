import React, {Component} from 'react';
import {Async as Select} from 'react-select';
import {sampleSize} from 'lodash';

import words from 'l/words';

export default class WordSelect extends Component {
  loadOptions = (input, cb) => {
    if (!input) {
      cb(null, {options: sampleSize(words, 10)});
      return;
    }

    cb(null, {
      options: words.filter(({word}) => word.toLowerCase().indexOf(input.toLowerCase()) > -1),
      complete: true
    });
  }

  render() {
    return (
      <Select
        simpleValue
        placeholder='Type and scroll to select a word...'
        minimumInput={0}
        labelKey='word'
        valueKey='word'
        loadOptions={this.loadOptions}
        className='select--word story--select'
        {...this.props}
      />
    );
  }
}
