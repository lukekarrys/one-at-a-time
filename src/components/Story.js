import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

import WordSelect from './WordSelect';
import EmojiSelect from './EmojiSelect';
import StoryItem from './StoryItem';

export default class Story extends Component {
  handleTextSelect = (value) => {
    if (value) {
      this.props.onSubmit({
        type: 'text',
        data: value
      });
    }
  };

  handleEmojiSelect = (value) => {
    if (value) {
      this.props.onSubmit({
        type: 'emoji',
        data: value
      });
    }
  }

  render() {
    const {story} = this.props;

    return (
      <div>
        <div className='story--items'>
          {story.data.map((item) => <StoryItem key={item.id} {...item} />)}
        </div>
        <Row>
          <Col xs={12} sm={6}>
            <WordSelect onChange={this.handleTextSelect} />
          </Col>
          <Col xs={12} sm={6}>
            <EmojiSelect onChange={this.handleEmojiSelect} />
          </Col>
        </Row>
      </div>
    );
  }
}
