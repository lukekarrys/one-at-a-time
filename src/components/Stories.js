import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default class Stories extends Component {
  render() {
    const {stories} = this.props;

    return (
      <ListGroup>
        {stories.map((story) =>
          <LinkContainer key={story.id} to={`/stories/${story.id}`}>
            <ListGroupItem>
              {story.name}
            </ListGroupItem>
          </LinkContainer>
        )}
      </ListGroup>
    );
  }
}
