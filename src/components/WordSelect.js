import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import Select from 'react-select';

import words from 'l/words';

export default class WordSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {words: words()};
  }

  componentWillReceiveProps() {
    this.setState({words: words()});
  }

  handleOpen = () => setTimeout(() => {
    // Hack to reset scroll position
    findDOMNode(this._select)
      .querySelector('.Select-menu')
      .scrollTop = 0;
  });

  render() {
    return (
      <Select
        ref={(c) => {this._select = c;}}
        searchable
        simpleValue
        allowCreate
        clearable={false}
        placeholder='Select a word'
        options={this.state.words}
        labelKey='word'
        valueKey='word'
        onOpen={this.handleOpen}
        {...this.props}
      />
    );
  }
}
