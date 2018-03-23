//@flow

type stateType = { isSidebarCollapsed: boolean, openKeys: Array<string> };
type toggleKeyActionType = {
  payload: string,
  type: string,
};

export const toggleSidebarReducer = (state: stateType) => {
  state.isSidebarCollapsed = !state.isSidebarCollapsed;
};
export const toggleKeyReducer = (state: stateType, action: toggleKeyActionType) => {
  const key = action.payload;

  state.openKeys.includes(key) ? state.openKeys.splice(state.openKeys.indexOf(key), 1) : state.openKeys.push(key);
};
