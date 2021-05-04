import { Action, ActionType, State } from './Interface';

const initialState = {
  ui: {
    current_drawer_index: 0 //drawer的当前index
  },
  transcode: {
    current_step: 0, //转码-步骤条的当前步骤
    is_source_file_selected: false
  },

};

export default function Reducer(state, action: Action) {
  if (!state) {
    state = initialState;
  }
  switch (action.type) {
    case ActionType.ChangeDrawerIndex:
      return {
        ...state,
        ui: {
          current_drawer_index: action.payload
        }
      };
    case ActionType.ChangeTranscodeStep:
      return {
        ...state,
        transcode: {
          ...state.transcode,
          current_step: action.payload
        }
      };
    case ActionType.changeMetadata:
      return {
        ...state,
        transcode: {
          ...state.transcode,
          metadata: action.payload
        }
      };
    case ActionType.ChangeFileSelected:
      return {
        ...state,
        transcode: {
          ...state.transcode,
          isFileSelected: action.payload
        }
      };
    case ActionType.ChangeCover:
      return {
        ...state,
        transcode: {
          ...state.transcode,
          coverImg: action.payload
        }
      }
  }
};
