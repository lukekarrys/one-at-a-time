import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Input, Button, PageHeader, Glyphicon} from 'react-bootstrap';
import {upperFirst} from 'lodash';

import Page from 'co/Page';
import * as storyActions from 'a/stories';

const mapStateToProps = (state, props) => ({
  type: ['public', 'private'].indexOf(props.route.path) === -1 ? 'private' : props.route.path,
  uid: state.me.uid
});

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
    if (!name) return;
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
        <PageHeader>Start a {`${upperFirst(type)}`} Story</PageHeader>
        <Input
          type='text'
          placeholder={'Enter a fun name for your story'}
          onKeyPress={this.handleKeyPress}
          value={name}
          onChange={this.setName}
          buttonAfter={<Button disabled={disabled} bsStyle={disabled ? 'default' : 'primary'} onClick={this.handleStart}>Start</Button>}
        />
        <Input
          checked={forceSharing}
          type='checkbox'
          label='Encourage sharing'
          onChange={this.setSharing}
          help={
            <span>
              <Glyphicon glyph='question-sign' />
              {' '}
              When this option is on, <strong>the same person won't be able to post too many times in a row</strong>.
              <br />
              <Glyphicon glyph='info-sign' />
              {' '}
              If you want to make a solo story <strong>you should keep this off</strong>.
            </span>
          }
        />
      </Page>
    );
  }
}
