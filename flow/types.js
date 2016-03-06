/* @flow */

export type SCU = (props: Object, state: Object) => boolean;

export type Action = { type: string };
export type ActionItem = { type: string, action: Action, timestamp: number };
export type ActionItems = { [key: number]: ActionItem };

export type PathItem = string | number;

export type Base16Theme = {
  [name: string]: string
};

export type Theme = {
  [name: string]: (string | Object)
};
