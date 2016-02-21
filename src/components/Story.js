import React, {Component} from 'react';
import {Row, Col, Alert} from 'react-bootstrap';
import gifshot from 'gifshot';
import {map} from 'lodash';
import {findDOMNode} from 'react-dom';

import PositionChange from './PositionChange';
import position from 'l/yPosition';
import WordSelect from './WordSelect';
import EmojiSelect from './EmojiSelect';
import GifButton from './GifButton';
import StoryItem from './StoryItem';

const hasWebCam = gifshot.isWebCamGIFSupported();

export default class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {error: null, inputPostion: 'top'};
  }

  handlePositionChange = () => {
    this.setState({inputPostion: position(findDOMNode(this.refs.inputs))});
  };

  clearError = () => this.setState({error: null});
  handleData = (type, data) => {
    if (type && data) {
      this.setState({error: null});
      this.props.onSubmit({type, data});
    }
  };

  handleText = (value) => this.handleData('text', value);
  handleEmoji = (value) => this.handleData('emoji', value);
  handleGif = (value) => this.handleData('gif', value);
  handleGifError = (message) => this.setState({error: message});

  render() {
    const {story, me} = this.props;
    const {error, inputPostion} = this.state;
    const hasUser = map(story.data, 'user.uid').indexOf(me.uid) > -1;
    const hasData = !!story.data.length;

    return (
      <PositionChange onChange={this.handlePositionChange}>
        <div className='story--items'>
          {!hasData &&
            <Alert bsStyle='success'>
              This story doesn't have anything in it yet. Invite some people or add the first emoji/gif/word!
            </Alert>
          }
          {story.data.map((item) => <StoryItem key={item.id} {...item} />)}
        </div>
        {hasData && !hasUser &&
          <Alert bsStyle='info'>
            <span>Use the inputs below to enter a word or emoji</span>
            {hasWebCam &&
              <span> or take a picture with your webcam</span>
            }
            <span>!</span>
          </Alert>
        }
        {error &&
          <Alert bsStyle='danger' onDismiss={this.clearError}>
            {error}
          </Alert>
        }
        <Row ref='inputs' className={`story--inputs story--inputs--${inputPostion}`}>
          <Col sm={hasWebCam ? 10 : 12} md={hasWebCam ? 10 : 12} lg={hasWebCam ? 11 : 12}>
            <Row>
              <Col sm={6}>
                <WordSelect onChange={this.handleText} />
              </Col>
              <Col sm={6}>
                <EmojiSelect onChange={this.handleEmoji} />
              </Col>
            </Row>
          </Col>
          {hasWebCam &&
            <Col sm={2} md={2} lg={1}>
              <GifButton onError={this.handleGifError} onGif={this.handleGif} />
            </Col>
          }
        </Row>
      </PositionChange>
    );
  }
}
