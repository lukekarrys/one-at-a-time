import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {Async as Select} from '@lukekarrys/react-select';
import {sampleSize, defer} from 'lodash';

const MAX_SIZE = 20;

export default class StoryItemSelect extends Component {
  loadOptions = (input, cb) => {
    const {options, valueKey} = this.props;

    if (!input) {
      cb(null, {options: sampleSize(options, MAX_SIZE), complete: false});
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

    cb(null, {options: sorted.slice(0, MAX_SIZE), complete: false});
  };

  // Set timeout ensures the menu is in the dom
  handleOpen = () => defer(() => {
    const dom = findDOMNode(this._select);
    // Hack to reset scroll position
    dom.querySelector('.Select-menu').scrollTop = 0;
    // Load random options on each open
    this._select.loadOptions('');
    // Show the outer menu now that were done
    dom.querySelector('.Select-menu-outer').style.visibility = 'visible';
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
