//@flow

type stateType = {
  message: string,
  label: string,
  isLoading: boolean,
};
type sayHelloActionType = {
  payload: string,
  type: string,
};

export const sayHelloRequestReducer = ( state: stateType ) => {
  state.message = 'Loading...';

  state.label = 'Loading...';

  state.isLoading = true;
};

export const sayHelloSuccessReducer = (
  state: stateType, action: sayHelloActionType
) => {
  state.message = action.payload;

  state.label = 'Say it again!';

  state.isLoading = false;
};

export const sayHelloFailureReducer = ( state: stateType ) => {
  state.message = 'No message received, please check your connection and try again';

  state.label = 'Try saying hi again!';

  state.isLoading = false;
};
