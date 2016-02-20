import React, {Component} from 'react';
import {Input, Button} from 'react-bootstrap';

const ENTER = 13;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  handleKeyPress = (e) => {
    if (e.charCode === ENTER) {
      this.handleSubmit();
    }
  }

  handleSubmit = () => {
    const value = this.refs.input.getValue();

    if (value) {
      this.props.onSubmit({
        type: 'text',
        data: value
      });
      this.setState({text: ''});
    }
  }

  render() {
    const {story} = this.props;

    if (!story || story.joining) {
      return <span>Loading story...</span>;
    }

    return (
      <div>
        {story.data.map((item) => <span key={item.id}>{item.data}</span>)}
        <Input
          value={this.state.text}
          ref='input'
          type='text'
          placeholder='Enter some text...'
          onKeyPress={this.handleKeyPress}
          onChange={(e) => this.setState({text: e.target.value})}
          buttonAfter={<Button onClick={this.handleSubmit}>Submit</Button>}
        />
      </div>
    );
  }
}
