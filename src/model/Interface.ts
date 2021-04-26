export interface Action {
  type: ActionType,
  payload: any
}

export enum ActionType {
  'ChangeDrawerIndex'
}
