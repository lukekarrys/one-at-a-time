import React, {Component} from 'react';
import {Glyphicon} from 'react-bootstrap';
import ClipboardButton from 'react-clipboard.js';
import classNames from 'classnames';

export default class CopyUrl extends Component {
  constructor(props) {
    super(props);
    this.state = {copySuccess: false};
  }

  handleCopySuccess = () => {
    this.setState({copySuccess: true});
    setTimeout(() => {
      this.setState({copySuccess: false});
    }, 2500);
  };

  render() {
    const {copySuccess} = this.state;
    const copyClasses = classNames('copy--url--message', {
      'copy--url--message--success': copySuccess
    });

    return (
      <span>
        <ClipboardButton
          className='btn btn-success btn-xs copy--url--btn'
          data-clipboard-text={window.location.href}
          onSuccess={this.handleCopySuccess}
        >
          Invite
          {' '}
          <Glyphicon glyph='copy' />
        </ClipboardButton>
        <small className={copyClasses}>
          Copied Link!
          {' '}
          <Glyphicon glyph='link' />
        </small>
      </span>
    );
  }
}
