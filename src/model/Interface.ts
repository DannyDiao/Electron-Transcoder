import { DefaultRootState } from 'react-redux';

export interface Action {
  type: ActionType,
  payload: any
}

export enum ActionType {
  'ResetAllState',
  'ChangeDrawerIndex',
  'ChangeTranscodeStep'
}

export interface State extends DefaultRootState{
  ui: UIInterface,
  transcode: TranscodeInterface
}

export interface UIInterface {
  current_drawer_index: number
}

export interface TranscodeInterface {
  current_step: number
}
