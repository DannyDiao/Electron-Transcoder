
export interface Action {
  type: ActionType,
  payload: any
}

export enum ActionType {
  'ResetAllState',
  'ChangeDrawerIndex',
  'ChangeTranscodeStep',
  'changeMetadata',
  'ChangeFileSelected',
  'ChangeCover',
  'ChangeTranscodeParams',
  'AddTask',
  'CleanTranscode',
  'ModifyTask',
}


export interface UIInterface {
  current_drawer_index: number
}

export interface TranscodeInterface {
  current_step: number,
  is_source_file_selected: boolean
}
