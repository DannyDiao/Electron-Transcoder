import { Action, ActionType } from './Interface';

const initialState = {};

export default function Reducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionType.ChangeDrawerIndex:
      return {
        ...state,
        ui: {
          current_drawer_index: action.payload
        }
      };
  }
}
