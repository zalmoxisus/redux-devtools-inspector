/* @flow */

const truthy = x => x;

import type { Theme } from '../flow/types.js';

export default function themeable(theme: Theme): ((...names: Array<?string>) => Object) {
  return (...names: Array<?string>) => {
    const styles = names
      .reduce((arr: Array<?string>, name: ?string) =>
        arr.concat(name, name && (name + 'Color')), [])
      .map(name => name && theme[name])
      .filter(truthy);

    const classStyles = styles.filter(s => typeof s === 'string');
    const objStyles = styles.filter(s => typeof s !== 'string');

    return {
      ...(classStyles.length ? { className: classStyles.join(' ') } : {}),
      // $FlowFixMe: https://github.com/facebook/flow/issues/1414
      ...(objStyles.length ? { style: Object.assign({}, ...objStyles) } : {})
    };
  }
};
