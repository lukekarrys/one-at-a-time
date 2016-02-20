import React, {Component} from 'react';
import {Row, Col, Alert} from 'react-bootstrap';

import WordSelect from './WordSelect';
import EmojiSelect from './EmojiSelect';
import GifButton from './GifButton';
import StoryItem from './StoryItem';

export default class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {error: null};
  }

  handleData = (type, value) => {
    if (value) {
      this.setState({error: null});
      this.props.onSubmit({
        type,
        data: value
      });
    }
  };

  onGifError = (message) => {
    this.setState({
      error: message
    });
  };

  render() {
    const {story} = this.props;
    const {error} = this.state;

    return (
      <div>
        <div className='story--items'>
          {story.data.map((item) => <StoryItem key={item.id} {...item} />)}
        </div>
        {error &&
          <Alert bsStyle='danger' onDismiss={() => this.setState({error: null})}>
            {error}
          </Alert>
        }
        <Row>
          <Col xs={12} sm={5}>
            <WordSelect onChange={(...args) => this.handleData('text', ...args)} />
          </Col>
          <Col xs={12} sm={5}>
            <EmojiSelect onChange={(...args) => this.handleData('emoji', ...args)} />
          </Col>
          <Col xs={12} sm={2}>
            <GifButton onError={this.onGifError} onGif={(...args) => this.handleData('gif', ...args)} />
          </Col>
        </Row>
      </div>
    );
  }
}
