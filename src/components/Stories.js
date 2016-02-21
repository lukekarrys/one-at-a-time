import React, {Component} from 'react';
import {ListGroup, ListGroupItem, Glyphicon} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router';

export default class Stories extends Component {
  render() {
    const {stories, isUser} = this.props;

    return (
      <ListGroup>
        {!stories.length &&
          <ListGroupItem>
            {isUser
              ? <span>You have not created any stories yet. <Link to='/start/private'>Start one?</Link></span>
              : <span>There are no public stories. <Link to='/start/public'>Start one?</Link></span>
            }
          </ListGroupItem>
        }
        {stories.map((story) =>
          <LinkContainer key={story.id} to={`/stories/${story.id}`}>
            <ListGroupItem>
              {story.name}
              {isUser &&
                <span>{' '}<Glyphicon glyph={story.type === 'private' ? 'lock' : 'globe'} /></span>
              }
            </ListGroupItem>
          </LinkContainer>
        )}
      </ListGroup>
    );
  }
}
