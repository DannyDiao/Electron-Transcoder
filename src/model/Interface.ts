export interface Action {
  type: ActionType,
  payload: any
}

export enum ActionType {
  'ChangeDrawerIndex'
}

export interface State {
  ui: UIInterface
}

export interface UIInterface {
  current_drawer_index: number
}
