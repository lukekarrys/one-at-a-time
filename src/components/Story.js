import React, {Component} from 'react';
import {Row, Col, Alert} from 'react-bootstrap';
import gifshot from 'gifshot';
import {map, without, takeRight} from 'lodash';
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

  isDisabled = () => {
    const {story, me} = this.props;
    const MAX_POSTS = 2;

    if (!story || !story.forceSharing || story.data.length <= MAX_POSTS) return false;

    const userIds = map(story.data, 'user.uid');
    return without(takeRight(userIds, MAX_POSTS), me.uid).length === 0;
  }

  clearError = () => this.setState({error: null});
  handleData = (type, data) => {
    if (type && data && !this.isDisabled()) {
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
    const userIds = map(story.data, 'user.uid');
    const hasUser = userIds.indexOf(me.uid) > -1;
    const hasData = !!story.data.length;
    const disabled = this.isDisabled();

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
        {disabled &&
          <Alert bsStyle='warning'>
            Whoa! Slow down a little bit and let some other people add to the story.
          </Alert>
        }
        <Row ref='inputs' className={`story--inputs story--inputs--${inputPostion}`}>
          <Col sm={hasWebCam ? 10 : 12} md={hasWebCam ? 10 : 12} lg={hasWebCam ? 11 : 12}>
            <Row>
              <Col sm={6}>
                <WordSelect onChange={this.handleText} disabled={disabled} />
              </Col>
              <Col sm={6}>
                <EmojiSelect onChange={this.handleEmoji} disabled={disabled} />
              </Col>
            </Row>
          </Col>
          {hasWebCam &&
            <Col sm={2} md={2} lg={1}>
              <GifButton onError={this.handleGifError} onGif={this.handleGif} disabled={disabled} />
            </Col>
          }
        </Row>
      </PositionChange>
    );
  }
}
