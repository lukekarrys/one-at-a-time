import React, {Component} from 'react';
import {debounce} from 'lodash';
import {Row, Col, Alert} from 'react-bootstrap';
import gifshot from 'gifshot';
import {findDOMNode} from 'react-dom';

import position from 'l/elementPosition';
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
    this.setState({
      inputPostion: position(findDOMNode(this.refs.inputs)).half
    });
  }, 50);

  handleData = (type, value) => {
    if (value) {
      this.setState({error: null});
      this.props.onSubmit({
        type,
        data: value
      });
    }
  };

  handleText = (value) => this.handleData('text', value);
  handleEmoji = (value) => this.handleData('emoji', value);
  handleGif = (value) => this.handleData('gif', value);
  handleGifError = (message) => {
    this.setState({
      error: message
    });
  };

  render() {
    const {story} = this.props;
    const {error, inputPostion} = this.state;

    return (
      <div>
        <div className='story--items'>
          {!story.data.length &&
            <Alert bsStyle='success'>
              This story doesn't have anything in it yet. Invite some people or add the first emoji/gif/word!
            </Alert>
          }
          {story.data.map((item) => <StoryItem key={item.id} {...item} />)}
        </div>
        {error &&
          <Alert bsStyle='danger' onDismiss={() => this.setState({error: null})}>
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
      </div>
    );
  }
}
