import React, {Component} from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <p className='pull-left'>
          Emoji art supplied by <a href='http://emojione.com/'>Emoji One</a>
        </p>
        <p className='pull-right'>
          Made with love by <a href='http://lukekarrys.com'>Luke</a> in Arizona.
        </p>
      </footer>
    );
  }
}
