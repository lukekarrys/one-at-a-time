import React, {Component} from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import gifshot from 'gifshot';

export default class GifButton extends Component {
  handleGif = () => {
    gifshot.createGIF({
      gifHeight: 48,
      gifWidth: 48,
      interval: 0.2,
      numFrames: 5
    }, (obj) => {
      if (!obj.error) {
        this.props.onGif(obj.image);
      }
      else {
        this.props.onError(obj.errorMsg);
      }
    });
  }

  render() {
    if (!gifshot.isWebCamGIFSupported()) {
      return (
        <Button block disabled className='disabled'>
          No
          {' '}
          <Glyphicon glyph='camera' />
          {' '}
          support
        </Button>
      );
    }

    return (
      <Button onClick={this.handleGif} block>
        <Glyphicon glyph='camera' />
      </Button>
    );
  }
}
