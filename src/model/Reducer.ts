import { Action, ActionType, State } from './Interface';

const initialState: State = {
  ui: {
    current_drawer_index: 0
  }
};

export default function Reducer(state, action: Action) {
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
