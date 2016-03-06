/* @flow */

import { Iterable, fromJS } from 'immutable';
import isIterable from './isIterable';

import type { PathItem } from '../flow/types.js';

function iterateToKey(obj: Object, key: number) { // maybe there's a better way, dunno
  let idx = 0;
  for (let entry of obj) {
    if (Array.isArray(entry)) {
      if (entry[0] === key) return entry[1];
    } else {
      if (idx > key) return;
      if (idx === key) return entry;
    }
    idx++;
  }
}

export default function getInspectedState(
  state: Object, path: Array<PathItem>, convertImmutable: boolean): any {

  state = path.length ?
    {
      [path[path.length - 1]]: path.reduce(
        (s: any, key: PathItem) => {
          if (!s) {
            return s;
          }

          if (Iterable.isAssociative(s)) {
            return s.get(key);
          } else if (isIterable(s)) {
            return iterateToKey(s, typeof key === 'number' ? key : 0);
          }

          return s[key];
        },
        state
      )
    } : state;

  if (convertImmutable) {
    state = fromJS(state).toJS();
  }

  return state;
}
