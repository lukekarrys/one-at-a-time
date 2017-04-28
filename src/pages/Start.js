import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Checkbox, HelpBlock, InputGroup, FormGroup, FormControl, Button, PageHeader, Glyphicon} from 'react-bootstrap';
import {upperFirst, last} from 'lodash';

import Page from 'co/Page';
import * as storyActions from 'a/stories';

const InputGroupButton = InputGroup.Button;

const mapStateToProps = (state, props) => {
  const type = last(props.match.path.split('/'));
  return {
    type: type === 'public' || type === 'private' ? type : 'private',
    uid: state.me.uid,
    match: props.match
  };
};

const mapDispatchToProps = (dispatch) => ({
  storyActions: bindActionCreators(storyActions, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', forceSharing: props.type === 'public'};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({forceSharing: nextProps.type === 'public'});
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.handleStart();
    }
  };

  handleStart = () => {
    const {type, uid} = this.props;
    const {name, forceSharing} = this.state;

    this.props.storyActions.start({
      type,
      name,
      uid,
      forceSharing
    });
  };

  setName = (e) => this.setState({name: e.target.value});
  setSharing = (e) => this.setState({forceSharing: e.target.checked});

  render() {
    const {type} = this.props;
    const {name, forceSharing} = this.state;
    const disabled = !name;

    return (
      <Page>
        <PageHeader>
          Start a {`${upperFirst(type)}`} Story
          {type === 'private' &&
            <small className='xs'>Private means that the url will not be shown on the public page, but anyone with the url will still be able to join.</small>
          }
        </PageHeader>
        <FormGroup>
          <InputGroup>
            <FormControl
              type='text'
              placeholder={'Enter a fun name for your story'}
              onKeyPress={this.handleKeyPress}
              value={name}
              onChange={this.setName}
            />
            <InputGroupButton>
              <Button disabled={disabled} bsStyle={disabled ? 'default' : 'primary'} onClick={this.handleStart}>Start</Button>
            </InputGroupButton>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Checkbox
            checked={forceSharing}
            onChange={this.setSharing}
          >
            Encourage sharing
          </Checkbox>
          <HelpBlock>
            <Glyphicon glyph='question-sign' />
            {' '}
            When this option is on, <strong>the same person won’t be able to post too many times in a row</strong>.
            <br />
            <Glyphicon glyph='user' />
            {' '}
            If you want to make a solo story <strong>you should keep this off</strong>.
          </HelpBlock>
        </FormGroup>
      </Page>
    );
  }
}
