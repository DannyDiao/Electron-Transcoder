let dispatch: Function;

export function getDispatch(){
  return dispatch;
}

export function setDispatch(newDispatch:Function){
  dispatch = newDispatch;
}
