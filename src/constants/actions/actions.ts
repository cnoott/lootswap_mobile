export const createActionConst = (name: String) => {
  return {
    REQUEST: `${name}.REQUEST`,
    SUCCESS: `${name}.SUCCESS`,
    UPDATE: `${name}.SUCCESS`,
    FAILURE: `${name}.FAILURE`,
    RESET: `${name}.RESET`,
  };
};

export const actions = {
  SIGN_IN_DATA: 'SIGN_IN_DATA',
  SIGN_UP_DATA: 'SIGN_UP_DATA',
  SIGN_OUT: 'SIGN_OUT',
  LOADING: 'LOADING',
};
