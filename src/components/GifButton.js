import React, {Component} from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import gifshot from 'gifshot';
import {omit} from 'lodash';

export default class GifButton extends Component {
  handleGif = () => {
    gifshot.createGIF({
      gifHeight: 40,
      gifWidth: 40,
      interval: 0.2,
      numFrames: 5,
      keepCameraOn: false
    }, (obj) => {
      if (!obj.error) {
        this.props.onGif(obj.image);
      }
      else {
        this.props.onError(obj.errorMsg);
      }
    });
  };

  render() {
    const props = omit(this.props, 'onGif', 'onError');

    return (
      <Button onClick={this.handleGif} block className='story--gif--btn' {...props}>
        <Glyphicon glyph='camera' />
      </Button>
    );
  }
}
