import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Input, Button, PageHeader} from 'react-bootstrap';

import Page from 'co/Page';
import * as storyActions from 'a/stories';

const mapStateToProps = (state, props) => ({
  type: ['public', 'private'].indexOf(props.route.path) === -1 ? 'private' : props.route.path
});

const mapDispatchToProps = (dispatch) => ({
  storyActions: bindActionCreators(storyActions, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {name: ''};
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.handleCreate();
    }
  }

  handleCreate = () => {
    const {type} = this.props;
    const {name} = this.state;
    this.props.storyActions.create({type, name});
  }

  render() {
    const {type} = this.props;

    return (
      <Page>
        <PageHeader>Creating {type} story...</PageHeader>
        <Input
          type='text'
          placeholder={'Enter a fun name for your story'}
          onKeyPress={this.handleKeyPress}
          onChange={(e) => this.setState({name: e.target.value})}
          buttonAfter={<Button onClick={this.handleCreate}>Create</Button>}
        />
      </Page>
    );
  }
}
