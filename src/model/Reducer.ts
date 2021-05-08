import { Action, ActionType } from './Interface';

const initialState = {
  ui: {
    current_drawer_index: 0 //drawer的当前index
  },
  transcode: {
    current_step: 0, //转码-步骤条的当前步骤
    is_source_file_selected: false,
    coverImg: '',
    params: {}
  },
  tasks: []
};

export default function Reducer(state, action: Action) {
  if (state === undefined) {
    state = initialState;
  }
  let tasks;
  let modify;
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
    case ActionType.ChangeTranscodeParams:
      return {
        ...state,
        transcode: {
          ...state.transcode,
          params: action.payload
        }
      }
    case ActionType.AddTask:
      return {
        ...state,
        tasks: state.tasks.length > 0 ? [...state.tasks, action.payload] : [action.payload]
      }
    case ActionType.CleanTranscode:
      return {
        ...initialState,
        ui: state.ui,
        tasks: state.tasks
      };
    case ActionType.ModifyTask:
      tasks = state.tasks.filter(item => item.id !== action.payload.id);
      modify = state.tasks.find(item => item.id === action.payload.id);
      modify = { ...modify, ...action.payload };
      tasks.push(modify);
      return {
        ...state,
        tasks: tasks
      }
  }
};
