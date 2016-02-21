import React, {Component} from 'react';

const INTERNAL_INTERVAL = '__logo__interval__';
const BLANK = '_____';
const BRANDS = [
  'word',
  'gif',
  'emoji',
  'face',
  'smile'
];

export default class Logo extends Component {
  static defaultProps = {
    interval: 500,
    cycle: false,
    onHover: false,
    fixed: false
  };

  constructor(props) {
    super(props);
    this.state = {brand: null, previousIndex: 0};
  }

  componentDidMount() {
    const {onHover} = this.props;

    if (!onHover) {
      this.startInterval();
    }
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  startInterval = () => {
    const {interval, cycle} = this.props;

    if (this[INTERNAL_INTERVAL]) {
      clearInterval(this[INTERNAL_INTERVAL]);
    }

    this[INTERNAL_INTERVAL] = setInterval(() => {
      const {brand, previousIndex} = this.state;

      if (cycle) {
        this.setState({
          brand: (brand || 0) === BRANDS.length - 1 ? 0 : (brand || 0) + 1
        });
      }
      else {
        if (brand === null) {
          this.setState({
            brand: previousIndex,
            previousIndex: previousIndex === BRANDS.length - 1 ? 0 : previousIndex + 1
          });
        }
        else {
          this.setState({brand: null});
        }
      }
    }, interval);
  };

  clearInterval = () => {
    if (this[INTERNAL_INTERVAL]) {
      clearInterval(this[INTERNAL_INTERVAL]);
      delete this[INTERNAL_INTERVAL];
    }
    this.setState({brand: null, previousIndex: 0});
  };

  render() {
    const {onHover, fixed} = this.props;
    const {brand} = this.state;

    const events = {};

    if (onHover) {
      events.onMouseEnter = this.startInterval;
      events.onMouseLeave = this.clearInterval;
    }

    return (
      <span {...events}>
        one
        {' '}
        <span className={fixed ? 'logo--change--fixed' : ''}>
          {typeof brand === 'number' &&
            <span>{BRANDS[brand]}</span>
          }
          {typeof brand !== 'number' &&
            (fixed ? <span>{(' ').replace(/ /g, '\u00a0')}</span> : <span>{BLANK}</span>)
          }
        </span>
        {' '}
        at a time
      </span>
    );
  }
}
