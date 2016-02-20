import {shuffle} from 'lodash';
import buzzwords from 'buzzwords';
import weasels from 'weasels';
import dc from 'dale-chall';
import spache from 'spache';
import fillers from 'fillers';
import hedges from 'hedges';

const words = [
  ...buzzwords,
  ...weasels,
  ...dc,
  ...spache,
  ...fillers,
  ...hedges
].map((word) => ({word}));

export default () => shuffle(words);
