import React, {Component} from 'react';
import {debounce} from 'lodash';

export default class PositionChange extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.handlePositionChange);
    window.addEventListener('scroll', this.handlePositionChange);
    this.handlePositionChange();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handlePositionChange);
    window.removeEventListener('scroll', this.handlePositionChange);
  }

  handlePositionChange = debounce(() => {
    this.props.onChange();
  }, 50);

  render() {
    return <div>{this.props.children}</div>;
  }
}
