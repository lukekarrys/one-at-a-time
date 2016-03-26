import {uniqBy} from 'lodash';
import buzzwords from 'buzzwords';
import weasels from 'weasels';
import dc from 'dale-chall';
import spache from 'spache';
import fillers from 'fillers';
import hedges from 'hedges';
import yes from 'yes-no-words/yes';
import no from 'yes-no-words/no';
import superb from 'superb/words';
import cats from 'cat-names/cat-names';
import three from './threeThousandWords';
import commonWords from './commonWords';

export default uniqBy([
  ...three,
  ...commonWords,
  ...superb,
  ...cats,
  ...yes,
  ...no,
  ...buzzwords,
  ...weasels,
  ...dc,
  ...spache,
  ...fillers,
  ...hedges
].map((word) => ({word: word.toLowerCase()})), 'word');
