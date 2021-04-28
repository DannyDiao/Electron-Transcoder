import { Action, ActionType, State } from './Interface';


export default function Reducer(state, action: Action) {
  switch (action.type) {
    case ActionType.ChangeDrawerIndex:
      return {
        ...state,
        ui: {
          current_drawer_index: action.payload
        }
      }
    case ActionType.ChangeTranscodeStep:
      return {
        ...state,
        transcode: {
          ...state.transcode,
          current_step: action.payload
        }
      }
    case ActionType.changeMetadata:
      debugger
      console.log("changeMetadata")
      return {
        ...state,
        transcode: {
          ...state.transcode,
          metadata: action.payload
        }
      }
    case ActionType.ChangeFileSelected:
      return  {
        ...state,
        transcode: {
          ...state.transcode,
          isFileSelected: action.payload
        }
      }
  }
}
