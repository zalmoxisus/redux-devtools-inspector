/* @flow */

import React from 'react';
import dateformat from 'dateformat';
import themeable from './themeable';

import type { ActionItems } from '../flow/types.js';

type ActionListProps = {
  theme: Object;
  actions: ActionItems;
  actionIds: Array<number>;
  isWideLayout: boolean;
  selectedActionId: ?number;
  onSelect: (actionId: number) => void;
  onSearch: (searchStr: string) => void;
  searchValue: ?string;
};

function getTime(actions: ActionItems, actionIds: Array<number>, actionId: number): string {
  const idx = actionIds.indexOf(actionId);
  const prevActionId = actionIds[idx - 1];

  return idx ?
    dateformat(actions[actionId].timestamp - actions[prevActionId].timestamp, '+MM:ss.L') :
    dateformat(actions[actionId].timestamp, 'h:MM:ss.L');
}

const ActionList = ({
  theme, actions, actionIds, isWideLayout,
  selectedActionId, onSelect, onSearch, searchValue
}: ActionListProps) => {
  const createTheme = themeable(theme);
  const lowerSearchValue = searchValue ? searchValue.toLowerCase() : '';
  const filteredActionIds = searchValue ? actionIds.filter(
    id => actions[id].action.type.toLowerCase().indexOf(lowerSearchValue) !== -1
  ) : actionIds;

  return (
    <div key='actionList'
         {...createTheme('actionList', isWideLayout ? 'actionListWide' : null)}>
      <input {...createTheme('actionListSearch')}
             onChange={e => onSearch(e.target.value)}
             placeholder='filter...' />
      {filteredActionIds.map((actionId, idx) =>
        <div key={idx}
             {...createTheme(
                'actionListItem',
                actionId === selectedActionId ? 'actionListItemSelected' : null
             )}
             onClick={() => onSelect(actionId)}>
          <div {...createTheme('actionListItemName')}>
            {actions[actionId].action.type}
          </div>
          <div {...createTheme('actionListItemTime')}>
            {getTime(actions, actionIds, actionId)}
          </div>
        </div>
      )}
    </div>
  );
}

export default ActionList;
