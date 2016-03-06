/* @flow */

import * as themes from 'redux-devtools-themes';

import type { Base16Theme } from '../flow/types.js';

export default function getBase16Theme(theme: string | Base16Theme): ?Base16Theme {
  if (typeof theme === 'string') {
    return themes[theme];
  }

  return theme.hasOwnProperty('base00') ? theme : undefined;
}
