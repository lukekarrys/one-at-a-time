import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {Async as Select} from '@lukekarrys/react-select';
import {sampleSize} from 'lodash';

const MAX_SIZE = 20;

export default class StoryItemSelect extends Component {
  loadOptions = (input, cb) => {
    const {options, valueKey} = this.props;

    if (!input) {
      cb(null, {options: sampleSize(options, MAX_SIZE)});
      return;
    }

    const searchInput = input.toLowerCase();
    const filtered = options.filter((option) => option[valueKey].toLowerCase().indexOf(searchInput) > -1);
    const sorted = filtered.sort((a, b) => {
      if (a[valueKey].toLowerCase() === searchInput) {
        return -1;
      }

      if (b[valueKey].toLowerCase() === searchInput) {
        return 1;
      }

      return 0;
    });

    cb(null, {options: sorted.slice(0, MAX_SIZE)});
  };

  handleOpen = () => setTimeout(() => {
    // Hack to reset scroll position
    findDOMNode(this._select)
      .querySelector('.Select-menu')
      .scrollTop = 0;
  });

  setRef = (c) => {
    this._select = c;
  };

  render() {
    // eslint-disable-next-line no-use-before-define
    const {className, options, ...rest} = this.props;

    return (
      <Select
        ref={this.setRef}
        simpleValue
        autoBlur
        cache={false}
        minimumInput={0}
        loadOptions={this.loadOptions}
        className={`${className} story--select`}
        onOpen={this.handleOpen}
        {...rest}
      />
    );
  }
}
